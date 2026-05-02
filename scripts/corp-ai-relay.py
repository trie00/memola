#!/usr/bin/env python3
"""
n365 social-AI relay
====================

ブラウザ (n365 bookmarklet) から社用 AI ゲートウェイをオンプレプロキシ経由
で呼び出すための、ローカルで動く小さな HTTP リレー。

なぜ必要か
----------
ブラウザの fetch() は環境変数 HTTP_PROXY / HTTPS_PROXY を読まない。また
Fetch API の仕様にプロキシを per-request 指定する手段がないため、bookmarklet
からは「社用 AI ゲートウェイには必ずオンプレプロキシ経由」というルーティング
を直接表現できない。

この問題を回避するため、PC 上にこのリレーを起動する:

    n365 (browser)  --HTTP-->  localhost:18080  --HTTPS via proxy-->  gateway

ブラウザは常時 localhost には到達できる (プロキシ判定はループバックを除外)。
リレー側は Python の requests ライブラリで自由にプロキシ指定できる。

使い方
------
    pip install requests                  # 一度だけ
    export CORP_AI_TARGET="https://gateway.example.com/myapi"
    export CORP_AI_PROXY="http://onprem-proxy.example.com:8080"
    python3 scripts/corp-ai-relay.py

n365 の設定モーダルで:
    プロバイダ              : 企業AI API
    ベース URL              : http://localhost:18080
    デプロイ ID プレフィックス : (組織の規約に合わせて)
    企業AI API キー          : サブスクリプションキー

注: 環境変数の代わりに --target / --proxy 引数でも指定可能。
"""

import argparse
import http.server
import json
import os
import socketserver
import sys
import urllib.parse

try:
    import requests
except ImportError:
    print(
        "requests ライブラリが見つかりません。\n"
        "    pip install requests\n"
        "を実行してから再実行してください。",
        file=sys.stderr,
    )
    sys.exit(1)


# ─── HTTP handler factory ──────────────────────────────────────────────────


def make_handler(target_url: str, proxy_url: str | None):
    """Build a request handler bound to a specific upstream + proxy.

    `target_url` is the gateway base; the request path is appended verbatim.
    `proxy_url` (if set) is used for both http and https — the gateway is
    HTTPS but `requests` tunnels via CONNECT through an HTTP proxy.
    """
    target = target_url.rstrip("/")
    proxies = (
        {"http": proxy_url, "https": proxy_url} if proxy_url else None
    )

    class Handler(http.server.BaseHTTPRequestHandler):
        # Keep the access log readable. Each line goes to stderr.
        def log_message(self, fmt, *args):
            sys.stderr.write(
                "[%s] %s\n" % (self.log_date_time_string(), fmt % args)
            )

        def _send_cors(self):
            # The bookmarklet runs on the SharePoint origin, so the relay
            # must explicitly allow it. `*` is fine since we're listening
            # only on localhost (no remote attacker can reach us anyway).
            self.send_header("Access-Control-Allow-Origin", "*")
            self.send_header(
                "Access-Control-Allow-Methods", "GET, POST, OPTIONS"
            )
            self.send_header(
                "Access-Control-Allow-Headers",
                "Content-Type, api-key, Accept, Authorization, X-Requested-With",
            )
            self.send_header("Access-Control-Max-Age", "86400")

        def do_OPTIONS(self):
            # Pre-flight from the browser. Reply 204 with CORS headers and
            # don't even contact the upstream.
            self.send_response(204)
            self._send_cors()
            self.end_headers()

        def _proxy(self, method: str):
            # Build the upstream URL by appending the request path verbatim.
            # n365's openai-corp.ts builds requests as:
            #   {baseUrl}/{api-version}/openai/deployments/{id}/chat/completions
            # so when baseUrl is http://localhost:18080, the path here will
            # already be /{api-version}/openai/deployments/...
            url = target + self.path
            length = int(self.headers.get("Content-Length") or "0")
            body = self.rfile.read(length) if length > 0 else None

            # Forward only the headers that matter. Strip Hop-by-hop
            # (Host, Connection, Content-Length, …) — `requests` will set
            # these correctly on the upstream call.
            forward_keys = (
                "content-type",
                "api-key",
                "accept",
                "authorization",
            )
            fwd_headers = {}
            for k, v in self.headers.items():
                if k.lower() in forward_keys:
                    fwd_headers[k] = v

            try:
                with requests.request(
                    method,
                    url,
                    data=body,
                    headers=fwd_headers,
                    proxies=proxies,
                    stream=True,                # SSE 重要
                    timeout=300,
                    verify=True,
                ) as upstream:
                    self.send_response(upstream.status_code)
                    self._send_cors()
                    # Mirror useful response headers. Critical: Content-Type
                    # (esp. text/event-stream for streaming), Cache-Control.
                    ct = upstream.headers.get("Content-Type", "application/json")
                    self.send_header("Content-Type", ct)
                    cc = upstream.headers.get("Cache-Control")
                    if cc:
                        self.send_header("Cache-Control", cc)
                    self.end_headers()

                    # Stream upstream chunks straight through to the browser.
                    # This preserves SSE semantics (chunks arrive as they do
                    # upstream) without buffering the whole response.
                    for chunk in upstream.iter_content(chunk_size=512):
                        if not chunk:
                            continue
                        try:
                            self.wfile.write(chunk)
                            self.wfile.flush()
                        except (BrokenPipeError, ConnectionResetError):
                            # Browser canceled — stop forwarding silently.
                            break
            except requests.exceptions.ProxyError as e:
                self._reply_error(502, "proxy_error",
                                  f"プロキシ {proxy_url} に接続できません: {e}")
            except requests.exceptions.SSLError as e:
                self._reply_error(502, "ssl_error",
                                  f"SSL 失敗: {e}")
            except requests.exceptions.ConnectionError as e:
                self._reply_error(502, "connection_error",
                                  f"upstream 接続失敗: {e}")
            except Exception as e:                            # noqa: BLE001
                self._reply_error(500, "relay_failed", str(e))

        def _reply_error(self, status: int, code: str, detail: str):
            payload = json.dumps(
                {"error": {"code": code, "detail": detail}},
                ensure_ascii=False,
            ).encode("utf-8")
            self.send_response(status)
            self._send_cors()
            self.send_header("Content-Type", "application/json")
            self.send_header("Content-Length", str(len(payload)))
            self.end_headers()
            try:
                self.wfile.write(payload)
            except (BrokenPipeError, ConnectionResetError):
                pass

        def do_POST(self):
            self._proxy("POST")

        def do_GET(self):
            self._proxy("GET")

    return Handler


class ThreadedHTTPServer(socketserver.ThreadingMixIn, http.server.HTTPServer):
    """Allow multiple in-flight requests (n365 may pipeline tool calls)."""
    daemon_threads = True
    allow_reuse_address = True


# ─── CLI ───────────────────────────────────────────────────────────────────


def main() -> int:
    ap = argparse.ArgumentParser(
        description="n365 → 社用 AI ゲートウェイ用ローカル中継",
    )
    ap.add_argument(
        "--port", type=int,
        default=int(os.environ.get("CORP_AI_PORT", "18080")),
        help="待ち受けポート (既定: 18080 / 環境変数 CORP_AI_PORT)",
    )
    ap.add_argument(
        "--target",
        default=os.environ.get("CORP_AI_TARGET"),
        help="ゲートウェイのベース URL "
             "(環境変数 CORP_AI_TARGET でも可)",
    )
    ap.add_argument(
        "--proxy",
        default=os.environ.get("CORP_AI_PROXY"),
        help="オンプレプロキシ URL "
             "(環境変数 CORP_AI_PROXY でも可)",
    )
    ap.add_argument(
        "--no-proxy", action="store_true",
        help="プロキシ無しで直接転送 (デバッグ用途)",
    )
    args = ap.parse_args()

    if not args.target:
        print(
            "エラー: ゲートウェイ URL が未指定です。\n"
            "    --target https://gateway.example.com/myapi\n"
            "または環境変数 CORP_AI_TARGET で指定してください。",
            file=sys.stderr,
        )
        return 1

    proxy = None if args.no_proxy else args.proxy
    if not proxy and not args.no_proxy:
        print(
            "警告: プロキシが未指定です。直接接続を試みます "
            "(社内環境では失敗する可能性が高いです)。",
            file=sys.stderr,
        )

    handler = make_handler(args.target, proxy)
    server = ThreadedHTTPServer(("127.0.0.1", args.port), handler)

    parsed_target = urllib.parse.urlparse(args.target)
    base_url_for_n365 = f"http://localhost:{args.port}"
    full_url_for_n365 = base_url_for_n365 + parsed_target.path

    print("─" * 64)
    print(f"  listen  : http://127.0.0.1:{args.port}")
    print(f"  target  : {args.target}")
    print(f"  proxy   : {proxy or '(直接接続)'}")
    print("─" * 64)
    print("n365 の設定モーダルに以下を入力:")
    print(f"  プロバイダ : 企業AI API")
    print(f"  ベース URL : {base_url_for_n365}{parsed_target.path}")
    print("    ※ ベース URL の path は target と同じにしてください")
    print(f"    ※ 例: {full_url_for_n365}")
    print("─" * 64)
    print("Ctrl+C で終了")

    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\n[shutdown]")
        server.server_close()
    return 0


if __name__ == "__main__":
    sys.exit(main())
