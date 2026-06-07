import http.server, socketserver, urllib.parse, os
OUT='/Users/a21/mytools/n365/captures'
class H(http.server.BaseHTTPRequestHandler):
    def _c(self):
        self.send_header('Access-Control-Allow-Origin','*'); self.send_header('Access-Control-Allow-Headers','*')
    def do_OPTIONS(self): self.send_response(204); self._c(); self.end_headers()
    def do_POST(self):
        q=urllib.parse.urlparse(self.path).query
        name=urllib.parse.parse_qs(q).get('name',['cap'])[0]
        name=''.join(c for c in name if c.isalnum() or c in '-_')+'.html'
        n=int(self.headers.get('Content-Length',0)); data=self.rfile.read(n)
        open(os.path.join(OUT,name),'wb').write(data)
        self.send_response(200); self._c(); self.end_headers(); self.wfile.write(b'ok')
    def log_message(self,*a): pass
socketserver.TCPServer(('127.0.0.1',18092),H).serve_forever()
