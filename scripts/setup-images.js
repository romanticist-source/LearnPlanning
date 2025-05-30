const fs = require("fs")
const path = require("path")

console.log("🖼️  画像セットアップを開始します...")

// .gitkeepファイルの作成
function createGitKeepFiles() {
  const STATIC_IMAGES_DIR = path.join(process.cwd(), "public", "images")
  const directories = ["avatars", "groups", "icons", "backgrounds", "attachments"]

  directories.forEach((dir) => {
    const gitkeepPath = path.join(STATIC_IMAGES_DIR, dir, ".gitkeep")
    if (!fs.existsSync(gitkeepPath)) {
      fs.writeFileSync(gitkeepPath, "")
      console.log(`   ✅ 作成: ${dir}/.gitkeep`)
    }
  })
}

// 画像最適化の推奨設定
function showImageOptimizationTips() {
  console.log("\n📋 画像最適化の推奨設定:")
  console.log("   👤 アバター: 300x300px, JPEG/WebP, 品質80%")
  console.log("   🏢 グループ画像: 800x400px, JPEG/WebP, 品質85%")
  console.log("   🎨 アイコン: SVG形式推奨")
  console.log("   🌅 背景画像: 1920x1080px, JPEG/WebP, 品質90%")
  console.log("   📎 添付ファイル: 10MB以下")
}

// サンプル画像URLの提供
function showSampleImageSources() {
  console.log("\n🔗 サンプル画像の取得先:")
  console.log("   • Unsplash: https://unsplash.com/ (高品質な写真)")
  console.log("   • Pixabay: https://pixabay.com/ (無料画像)")
  console.log("   • Pexels: https://www.pexels.com/ (無料ストック写真)")
  console.log("   • Heroicons: https://heroicons.com/ (SVGアイコン)")
  console.log("   • Lucide: https://lucide.dev/ (アイコンライブラリ)")
}

function main() {
  createGitKeepFiles()
  showImageOptimizationTips()
  showSampleImageSources()

  console.log("\n✅ 画像セットアップが完了しました!")
}

if (require.main === module) {
  main()
}
