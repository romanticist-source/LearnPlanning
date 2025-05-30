/**
 * データベースのセットアップスクリプト
 * JSON Serverと静的画像の初期設定を行います
 */

import fs from "fs"
import path from "path"

const STATIC_IMAGES_DIR = path.join(process.cwd(), "public", "images")

// 静的画像ディレクトリの作成
function createImageDirectories() {
  const directories = ["avatars", "groups", "icons", "backgrounds", "attachments"]

  directories.forEach((dir) => {
    const dirPath = path.join(STATIC_IMAGES_DIR, dir)
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true })
      console.log(`Created directory: ${dirPath}`)
    }
  })
}

// ダミー画像の生成（実際のプロジェクトでは実画像を配置）
function generatePlaceholderImages() {
  const placeholders = [
    "avatars/tanaka.jpg",
    "avatars/sato.jpg",
    "avatars/suzuki.jpg",
    "avatars/takahashi.jpg",
    "avatars/ito.jpg",
    "avatars/watanabe.jpg",
    "avatars/default.jpg",
    "groups/programming-group.jpg",
    "groups/algorithm-group.jpg",
    "groups/webdev-group.jpg",
    "groups/database-group.jpg",
    "groups/default-group.jpg",
    "backgrounds/hero-bg.jpg",
    "backgrounds/dashboard-bg.jpg",
    "backgrounds/meeting-bg.jpg",
  ]

  placeholders.forEach((placeholder) => {
    const filePath = path.join(STATIC_IMAGES_DIR, placeholder)
    if (!fs.existsSync(filePath)) {
      // プレースホルダーファイルを作成（実際の画像に置き換えてください）
      fs.writeFileSync(filePath, "")
      console.log(`Created placeholder: ${filePath}`)
    }
  })
}

// パッケージ設定の確認
function checkPackageJson() {
  const packagePath = path.join(process.cwd(), "package.json")

  if (fs.existsSync(packagePath)) {
    const packageJson = JSON.parse(fs.readFileSync(packagePath, "utf8"))

    const requiredDeps = {
      "json-server": "^0.17.4",
      concurrently: "^8.2.2",
    }

    const missing = Object.keys(requiredDeps).filter(
      (dep) => !packageJson.dependencies?.[dep] && !packageJson.devDependencies?.[dep],
    )

    if (missing.length > 0) {
      console.log("Missing dependencies. Please install:")
      console.log(`npm install ${missing.join(" ")}`)
    }

    // スクリプトの追加チェック
    const requiredScripts = {
      "db:start": "json-server --watch db.json --port 3001",
      "dev:full": 'concurrently "npm run dev" "npm run db:start"',
    }

    const missingScripts = Object.keys(requiredScripts).filter((script) => !packageJson.scripts?.[script])

    if (missingScripts.length > 0) {
      console.log("Add these scripts to package.json:")
      missingScripts.forEach((script) => {
        console.log(`"${script}": "${requiredScripts[script as keyof typeof requiredScripts]}"`)
      })
    }
  }
}

// メイン実行関数
function main() {
  console.log("Setting up Learn Planning database...")

  createImageDirectories()
  generatePlaceholderImages()
  checkPackageJson()

  console.log("Setup complete!")
  console.log("Next steps:")
  console.log("1. Replace placeholder images with actual images")
  console.log("2. Install missing dependencies if any")
  console.log('3. Run "npm run dev:full" to start both Next.js and JSON Server')
}

if (require.main === module) {
  main()
}

export { createImageDirectories, generatePlaceholderImages, checkPackageJson }
