// Tool schemas exposed to Claude via the Tool Use API.
//
// Rules / preconditions are written into each tool's `description` so they
// stay in the model's attention even after long conversations (more reliable
// than relying solely on the system prompt).
//
// The last tool carries `cache_control: { type: 'ephemeral' }` to mark the
// whole tools array as cacheable — drastically reduces input-token usage
// across turns (5min TTL, cache hits cost ~10% of normal input rate).

import type { ToolDef } from '../api/anthropic';

const TOOL_DEFS_RAW: ToolDef[] = [
  {
    name: 'list_pages',
    description: `n365 のすべてのページとデータベースの一覧を返す。
タイトル / ID / 親 ID / 種類のみ返し本文は含まない（軽量）。
AI が作業前に全体像を把握する用途。include_trashed=true でゴミ箱内も含める。`,
    input_schema: {
      type: 'object',
      properties: {
        include_trashed: {
          type: 'boolean',
          description: 'ゴミ箱に入っているページも含めるか。既定 false',
        },
      },
    },
  },

  {
    name: 'search_pages',
    description: `タイトルにキーワードを含むページを検索する（部分一致、大文字小文字無視）。
⚠️ create_page を呼ぶ前に必ず実行し、重複ページが無いか確認すること。
重複があった場合は user に「既存を更新するか新規作成するか」を確認する。`,
    input_schema: {
      type: 'object',
      properties: {
        query: { type: 'string', description: '検索キーワード' },
      },
      required: ['query'],
    },
  },

  {
    name: 'read_page',
    description: `ページ ID を指定して本文 (markdown) とタイトルを取得する。
update_page で修正する前に必ず読むこと。`,
    input_schema: {
      type: 'object',
      properties: {
        id: { type: 'string', description: 'ページ ID（数値の文字列）' },
      },
      required: ['id'],
    },
  },

  {
    name: 'create_page',
    description: `新規ページを作成する。

使用条件:
- user が「作って」「新規ページ」と明示的に依頼した時のみ
- 既存ページの修正で済む場合は update_page を使うこと

手順:
1. 呼ぶ前に search_pages で同名ページが無いか確認
2. 重複があれば user に確認
3. parent_id を省略するとルートに作られる。場所が曖昧なら user に質問

⚠️ body の重要ルール:
- user が内容（「○○について」「△△を要約」「内容は…」など）を指定した場合、
  必ず本文 markdown を body 引数に渡すこと。会話メッセージで内容を説明するだけ
  ではダメ。body を空のままでページ作成して「記録しました」と返すのは禁止。
- タイトルだけのページが欲しいと user が明示した時のみ body を省略する
- body の中身は完全な markdown 文書 (見出し / 箇条書き等を使った構造化された本文)`,
    input_schema: {
      type: 'object',
      properties: {
        title:     { type: 'string' },
        parent_id: { type: 'string', description: '親ページ ID。ルートなら空文字' },
        body:      {
          type: 'string',
          description: '本文の完全な markdown。user が内容を指定した場合は必ず指定する。',
        },
      },
      required: ['title'],
    },
  },

  {
    name: 'update_page',
    description: `既存ページのタイトルや本文を更新する。

使用条件:
- read_page で現在の内容を確認した後に使う
- 部分修正でも全文（修正後の完全な markdown）を渡すこと

title / body のいずれか、または両方を指定できる。指定しなかったフィールドは変更されない。

⚠️ 既存内容を上書きするため、ホスト側で user に diff プレビュー付きの確認モーダルが出る。
user がキャンセルした場合は { ok: false, error: "user_cancelled" } を返す。`,
    input_schema: {
      type: 'object',
      properties: {
        id:    { type: 'string' },
        title: { type: 'string' },
        body:  { type: 'string', description: '新しい markdown 本文（全文）' },
      },
      required: ['id'],
    },
  },

  {
    name: 'trash_page',
    description: `ページをゴミ箱に移動する（物理削除ではない）。

使用条件:
- user が明示的に「削除」「ゴミ箱に」と言ったときのみ
- 子ページがある場合はまとめて移動される旨を user に伝えてから実行

⚠️ ホスト側で必ず確認モーダルが出る。`,
    input_schema: {
      type: 'object',
      properties: {
        id: { type: 'string' },
      },
      required: ['id'],
    },
  },

  // ── Database tools ────────────────────────────────────

  {
    name: 'read_db_schema',
    description: `データベース (PageType=database) の列スキーマを取得する。
列名・内部名・型 (text / multiline / date / choice / bool / number) を返す。
list_db_rows / create_db_row / update_db_row を呼ぶ前に必ずこれで列構成を確認すること。`,
    input_schema: {
      type: 'object',
      properties: {
        db_id: { type: 'string', description: 'DB の page id (n365-pages の Id)' },
      },
      required: ['db_id'],
    },
  },

  {
    name: 'list_db_rows',
    description: `データベースの行一覧を取得する。Title と全列の値を返す。
件数が多い場合は limit で絞ること（既定 100）。本文 (markdown body) は含まないので、
本文が必要な行は read_db_row で個別取得。`,
    input_schema: {
      type: 'object',
      properties: {
        db_id: { type: 'string' },
        limit: { type: 'integer', minimum: 1, maximum: 500, description: '最大行数 (既定 100)' },
      },
      required: ['db_id'],
    },
  },

  {
    name: 'read_db_row',
    description: `データベースの 1 行を読み取る。Title・各列の値・本文 (markdown) を返す。`,
    input_schema: {
      type: 'object',
      properties: {
        db_id:  { type: 'string' },
        row_id: { type: 'integer', description: 'SP リスト内の行 ID（数値）' },
      },
      required: ['db_id', 'row_id'],
    },
  },

  {
    name: 'create_db',
    description: `新規データベース (DB) を作成する。

使用条件:
- user が「DB を作って」「データベース作成」と明示的に依頼した時のみ
- 通常ページ (create_page) で十分な内容なら DB は作らないこと

DB は作成時点で Title 列のみ存在。続けて add_db_field で列を追加できる。
user が「○○の DB を作って」と用途を指定した場合、その用途に適した列を
自動で提案 → user 確認 → add_db_field で追加するのが望ましい。`,
    input_schema: {
      type: 'object',
      properties: {
        title:     { type: 'string' },
        parent_id: { type: 'string', description: '親ページ ID。ルートなら空文字' },
      },
      required: ['title'],
    },
  },

  {
    name: 'add_db_field',
    description: `データベースに列 (フィールド) を追加する。

使用条件:
- create_db の直後にスキーマを組む時
- user が「○○列を追加して」と依頼した時

type に指定できる値:
- "text"       … 1行テキスト
- "multiline"  … 複数行テキスト
- "date"       … 日付
- "choice"     … 選択肢（choices 配列も渡すこと）
- "bool"       … はい/いいえ
- "number"     … 数値

複数列を一気に追加する場合は、本ツールを順番に複数回呼び出すこと
（並列 tool_use でも OK）。

⚠️ 列の追加は SP リストへの即反映で破壊的ではないが、user に作る列名一覧を
示してから実行するのが望ましい。`,
    input_schema: {
      type: 'object',
      properties: {
        db_id: { type: 'string' },
        name:  { type: 'string', description: '列の表示名（日本語可）' },
        type:  {
          type: 'string',
          enum: ['text', 'multiline', 'date', 'choice', 'bool', 'number'],
        },
        choices: {
          type: 'array',
          items: { type: 'string' },
          description: 'type=choice の場合の選択肢リスト',
        },
      },
      required: ['db_id', 'name', 'type'],
    },
  },

  {
    name: 'create_db_row',
    description: `データベースに行を追加する。

手順:
1. read_db_schema で列構成を取得
2. fields に列の InternalName または Title をキーに値を渡す
3. 必要なら body に行ページの markdown 本文を渡す（n365-pages に保存される）

値の形式:
- text/multiline: 文字列
- date: "YYYY-MM-DD" (JST として扱われ UTC ISO に変換される)
- choice: 選択肢のいずれかの文字列
- bool: true / false (または "1" / "0")
- number: 数値`,
    input_schema: {
      type: 'object',
      properties: {
        db_id: { type: 'string' },
        fields: {
          type: 'object',
          description: '列名 → 値のマップ。Title 列も含めること',
          additionalProperties: true,
        },
        body: { type: 'string', description: '行ページの markdown 本文（任意）' },
      },
      required: ['db_id', 'fields'],
    },
  },

  {
    name: 'update_db_row',
    description: `データベースの行を更新する。

手順:
1. read_db_row で現在の値を確認
2. 変更したい列だけを fields に入れて渡す（指定しない列は変更されない）
3. body を渡すと行ページの本文も更新される

⚠️ ホスト側で diff 確認モーダルが出る。user がキャンセルした場合は user_cancelled を返す。`,
    input_schema: {
      type: 'object',
      properties: {
        db_id:  { type: 'string' },
        row_id: { type: 'integer' },
        fields: {
          type: 'object',
          description: '更新する列だけのマップ',
          additionalProperties: true,
        },
        body: { type: 'string', description: '新しい markdown 本文（全文。任意）' },
      },
      required: ['db_id', 'row_id'],
    },
  },

  {
    name: 'delete_db_row',
    description: `データベースから行を削除する。

⚠️ ホスト側で確認ダイアログが出る。user_cancelled の場合は中止される。
n365-pages 上の対応する行ページ本文も同時に削除される（カスケード）。`,
    input_schema: {
      type: 'object',
      properties: {
        db_id:  { type: 'string' },
        row_id: { type: 'integer' },
      },
      required: ['db_id', 'row_id'],
    },
  },
];

// Apply cache_control to the LAST tool — this caches the entire tools array
// up to and including this entry. Saves ~3000 tokens / turn on cache hits.
export const TOOL_DEFS: ToolDef[] = TOOL_DEFS_RAW.map((t, i, arr) =>
  i === arr.length - 1 ? { ...t, cache_control: { type: 'ephemeral' as const } } : t,
);
