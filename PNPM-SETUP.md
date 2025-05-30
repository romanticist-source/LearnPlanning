# Learn Planning - pnpmセットアップガイド

このガイドでは、pnpmを使用してLearn Planningプロジェクトをセットアップする方法を説明します。

## 前提条件

- Node.js 18.0.0以上
- pnpm 8.0.0以上

## pnpmのインストール

### 方法1: npmを使用
\`\`\`bash
npm install -g pnpm
\`\`\`

### 方法2: スタンドアロンスクリプト（推奨）
\`\`\`bash
curl -fsSL https://get.pnpm.io/install.sh | sh -
\`\`\`

### 方法3: Homebrew（macOS）
\`\`\`bash
brew install pnpm
\`\`\`

### 方法4: Chocolatey（Windows）
\`\`\`bash
choco install pnpm
\`\`\`

## プロジェクトのセットアップ

### 1. リポジトリのクローン
\`\`\`bash
git clone <repository-url>
cd learn-planning
\`\`\`

### 2. 依存関係のインストール
\`\`\`bash
pnpm install
\`\`\`

### 3. 初期セットアップの実行
\`\`\`bash
pnpm setup
\`\`\`

このコマンドは以下を実行します：
- 画像ディレクトリの作成
- プレースホルダー画像の生成
- 環境変数ファイルの作成
- データベースバックアップの作成

### 4. 開発サーバーの起動
\`\`\`bash
# Next.js + JSON Serverを同時起動
pnpm dev:full
\`\`\`

または、個別に起動：
\`\`\`bash
# Next.jsのみ
pnpm dev

# JSON Serverのみ
pnpm db:start
\`\`\`

## 利用可能なコマンド

### 開発関連
\`\`\`bash
pnpm dev          # Next.js開発サーバー起動
pnpm dev:full     # Next.js + JSON Server同時起動
pnpm build        # プロダクションビルド
pnpm start        # プロダクションサーバー起動
pnpm lint         # ESLintでコードチェック
pnpm type-check   # TypeScript型チェック
\`\`\`

### データベース関連
\`\`\`bash
pnpm db:start     # JSON Server起動
pnpm db:reset     # データベースを初期状態にリセット
\`\`\`

### セットアップ関連
\`\`\`bash
pnpm setup        # 初期セットアップ
pnpm setup:images # 画像セットアップのみ
\`\`\`

## 環境変数

\`.env.local\`ファイルが自動作成されます：

\`\`\`
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_STATIC_IMAGES_URL=/images
NODE_ENV=development
JSON_SERVER_PORT=3001
JSON_SERVER_HOST=localhost
\`\`\`

## ディレクトリ構造

\`\`\`
learn-planning/
├── app/                    # Next.js App Router
├── components/             # Reactコンポーネント
├── hooks/                  # カスタムフック
├── lib/                    # ユーティリティ関数
├── public/
│   └── images/            # 静的画像
│       ├── avatars/       # ユーザーアバター
│       ├── groups/        # グループ画像
│       ├── icons/         # アイコン
│       ├── backgrounds/   # 背景画像
│       └── attachments/   # アップロードファイル
├── scripts/               # セットアップスクリプト
├── db.json               # JSON Serverデータベース
├── db.backup.json        # データベースバックアップ
├── .npmrc                # pnpm設定
└── pnpm-lock.yaml        # 依存関係ロックファイル
\`\`\`

## トラブルシューティング

### pnpmコマンドが見つからない
\`\`\`bash
# パスの確認
echo $PATH

# pnpmの再インストール
npm uninstall -g pnpm
curl -fsSL https://get.pnpm.io/install.sh | sh -
\`\`\`

### 依存関係の問題
\`\`\`bash
# キャッシュクリア
pnpm store prune

# node_modulesを削除して再インストール
rm -rf node_modules
rm pnpm-lock.yaml
pnpm install
\`\`\`

### JSON Serverが起動しない
\`\`\`bash
# ポート3001の使用状況確認
lsof -ti:3001

# プロセス強制終了
lsof -ti:3001 | xargs kill -9

# 再起動
pnpm db:start
\`\`\`

### 画像が表示されない
1. \`public/images/\`ディレクトリに画像ファイルが存在するか確認
2. \`pnpm setup:images\`を実行
3. Next.jsサーバーを再起動

## pnpmの利点

1. **高速**: npmやyarnより高速なインストール
2. **効率的**: ディスク容量を節約（重複パッケージの共有）
3. **厳密**: phantom dependenciesを防止
4. **モノレポ対応**: ワークスペース機能が充実

## 本番環境への展開

### Vercelでの展開
1. Vercelアカウントでプロジェクトをインポート
2. ビルドコマンドを\`pnpm build\`に設定
3. 環境変数を設定

### その他のプラットフォーム
- Netlify: \`pnpm build\`をビルドコマンドに設定
- Railway: 自動でpnpmを検出
- Render: \`pnpm install && pnpm build\`

## 追加リソース

- [pnpm公式ドキュメント](https://pnpm.io/)
- [Next.js公式ドキュメント](https://nextjs.org/docs)
- [JSON Server公式ドキュメント](https://github.com/typicode/json-server)
\`\`\`

## 注意事項

- テーマ機能は削除されました（ライトモードのみ）
- 将来的にダークモード機能が必要な場合は、CSS変数とTailwindのdark:クラスを使用して実装できます
- すべての依存関係はpnpmで管理されます
\`\`\`

これで、next-themesの機能が完全に削除され、pnpmで正常に動作するプロジェクトになりました。

## 次のステップ

1. **依存関係のクリーンインストール**：
   \`\`\`bash
   rm -rf node_modules
   rm pnpm-lock.yaml
   pnpm install
   \`\`\`

2. **セットアップの実行**：
   \`\`\`bash
   pnpm setup
   \`\`\`

3. **開発サーバーの起動**：
   \`\`\`bash
   pnpm dev:full
   \`\`\`

これで、テーマ機能なしのシンプルなライトモードUIでプロジェクトが動作します。将来的にダークモード機能が必要になった場合は、CSS変数とTailwindのdark:クラスを使用して簡単に実装できます。
