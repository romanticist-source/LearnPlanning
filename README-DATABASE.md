# Learn Planning - データベース設定ガイド

このガイドでは、Learn PlanningプロジェクトでJSON Serverを使用したデータベースと静的画像管理の設定方法について説明します。

## 必要な依存関係

以下のパッケージをインストールしてください：

\`\`\`bash
npm install json-server concurrently
\`\`\`

## プロジェクト構成

\`\`\`
project-root/
├── db.json                 # JSON Serverのデータベースファイル
├── lib/
│   ├── api.ts             # API呼び出し関数
│   └── image-utils.ts     # 画像管理ユーティリティ
├── public/
│   └── images/            # 静的画像ディレクトリ
│       ├── avatars/       # ユーザーアバター
│       ├── groups/        # グループ画像
│       ├── icons/         # アイコン画像
│       ├── backgrounds/   # 背景画像
│       └── attachments/   # アップロードされたファイル
├── hooks/
│   └── use-api.ts         # データフェッチ用カスタムフック
└── scripts/
    └── setup-database.ts  # データベースセットアップスクリプト
\`\`\`

## セットアップ手順

### 1. 初期設定の実行

\`\`\`bash
# セットアップスクリプトの実行
npm run ts-node scripts/setup-database.ts
\`\`\`

### 2. package.jsonにスクリプトを追加

\`\`\`json
{
  "scripts": {
    "db:start": "json-server --watch db.json --port 3001",
    "dev:full": "concurrently \"npm run dev\" \"npm run db:start\""
  }
}
\`\`\`

### 3. 環境変数の設定

\`.env.local\`ファイルを作成し、以下を追加：

\`\`\`
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_STATIC_IMAGES_URL=/images
\`\`\`

## 使用方法

### アプリケーションの起動

\`\`\`bash
# Next.jsとJSON Serverを同時に起動
npm run dev:full
\`\`\`

これにより以下が起動されます：
- Next.jsアプリ: http://localhost:3000
- JSON Server API: http://localhost:3001

### APIの使用例

\`\`\`typescript
import { goalApi, userApi } from '@/lib/api'

// 目標の取得
const goals = await goalApi.getAll()

// 新しいユーザーの作成
const newUser = await userApi.create({
  name: '新しいユーザー',
  email: 'user@example.com',
  avatar: '/images/avatars/default.jpg',
  role: 'student'
})
\`\`\`

### カスタムフックの使用例

\`\`\`typescript
import { useApi, useApiMutation } from '@/hooks/use-api'
import { goalApi } from '@/lib/api'

function GoalsComponent() {
  // データの取得
  const { data: goals, loading, error, refetch } = useApi(
    () => goalApi.getAll(),
    []
  )

  // データの更新
  const { mutate: createGoal, loading: creating } = useApiMutation(
    goalApi.create
  )

  const handleCreateGoal = async () => {
    const result = await createGoal({
      title: '新しい目標',
      description: '目標の説明',
      deadline: '2025-12-31T00:00:00Z',
      progress: 0,
      completed: false,
      priority: 'medium',
      userId: 'user-id'
    })
    
    if (result) {
      refetch() // データを再取得
    }
  }

  if (loading) return <div>読み込み中...</div>
  if (error) return <div>エラー: {error}</div>

  return (
    <div>
      {goals?.map(goal => (
        <div key={goal.id}>{goal.title}</div>
      ))}
      <button onClick={handleCreateGoal} disabled={creating}>
        {creating ? '作成中...' : '目標を作成'}
      </button>
    </div>
  )
}
\`\`\`

## 静的画像の管理

### 画像の配置

\`public/images/\` ディレクトリ内に画像を配置します：

\`\`\`
public/images/
├── avatars/           # ユーザーアバター (300x300px推奨)
├── groups/            # グループ画像 (800x400px推奨)
├── icons/             # SVGアイコン
├── backgrounds/       # 背景画像 (1920x1080px推奨)
└── attachments/       # アップロードされたファイル
\`\`\`

### 画像の使用

\`\`\`typescript
import { staticImages, getUserAvatar, getGroupImage } from '@/lib/image-utils'

// 静的画像の使用
<img src={staticImages.avatars.default || "/placeholder.svg"} alt="Default Avatar" />

// 動的な画像取得
<img src={getUserAvatar('田中太郎') || "/placeholder.svg"} alt="User Avatar" />
<img src={getGroupImage('プログラミング勉強会') || "/placeholder.svg"} alt="Group Image" />
\`\`\`

### 画像のアップロード

\`\`\`typescript
import { uploadImage, validateImageFile } from '@/lib/image-utils'

const handleImageUpload = async (file: File) => {
  const validation = validateImageFile(file)
  if (!validation.valid) {
    alert(validation.error)
    return
  }

  try {
    const imageUrl = await uploadImage(file, 'avatars')
    console.log('Uploaded image URL:', imageUrl)
  } catch (error) {
    console.error('Upload failed:', error)
  }
}
\`\`\`

## データベース構造

### 主要なエンティティ

- **users**: ユーザー情報
- **groups**: グループ情報
- **goals**: 学習目標
- **messages**: チャットメッセージ
- **events**: イベント・スケジュール
- **reminders**: リマインダー
- **activities**: 活動履歴
- **contributionData**: コントリビューションデータ

### リレーション

- User → Goals (1:多)
- Group → Members (多:多)
- Group → Goals (1:多)
- Group → Messages (1:多)
- Group → Events (1:多)
- Goal → Subgoals (1:多)

## トラブルシューティング

### JSON Serverが起動しない

\`\`\`bash
# ポートが使用中の場合
lsof -ti:3001 | xargs kill -9

# 再起動
npm run db:start
\`\`\`

### 画像が表示されない

1. \`public/images/\` ディレクトリに画像ファイルが存在するか確認
2. ファイルパスが正しいか確認
3. Next.jsを再起動

### APIエラーが発生する

1. JSON Serverが起動しているか確認
2. 環境変数が正しく設定されているか確認
3. ネットワーク接続を確認

## 本番環境での使用

本番環境では、JSON Serverの代わりに以下のような本格的なデータベースを使用することを推奨します：

- PostgreSQL + Prisma
- MongoDB + Mongoose
- Supabase
- Firebase Firestore

現在のAPI構造は、これらのデータベースに移行しやすいように設計されています。
