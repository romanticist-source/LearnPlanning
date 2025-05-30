const STATIC_IMAGES_BASE_URL = process.env.NEXT_PUBLIC_STATIC_IMAGES_URL || "/images"

// 静的画像のパス管理
export const staticImages = {
  // アバター画像
  avatars: {
    tanaka: `${STATIC_IMAGES_BASE_URL}/avatars/tanaka.jpg`,
    sato: `${STATIC_IMAGES_BASE_URL}/avatars/sato.jpg`,
    suzuki: `${STATIC_IMAGES_BASE_URL}/avatars/suzuki.jpg`,
    takahashi: `${STATIC_IMAGES_BASE_URL}/avatars/takahashi.jpg`,
    ito: `${STATIC_IMAGES_BASE_URL}/avatars/ito.jpg`,
    watanabe: `${STATIC_IMAGES_BASE_URL}/avatars/watanabe.jpg`,
    default: `${STATIC_IMAGES_BASE_URL}/avatars/default.jpg`,
  },

  // グループ画像
  groups: {
    programming: `${STATIC_IMAGES_BASE_URL}/groups/programming-group.jpg`,
    algorithm: `${STATIC_IMAGES_BASE_URL}/groups/algorithm-group.jpg`,
    webdev: `${STATIC_IMAGES_BASE_URL}/groups/webdev-group.jpg`,
    database: `${STATIC_IMAGES_BASE_URL}/groups/database-group.jpg`,
    default: `${STATIC_IMAGES_BASE_URL}/groups/default-group.jpg`,
  },

  // アイコン画像
  icons: {
    goal: `${STATIC_IMAGES_BASE_URL}/icons/goal.svg`,
    calendar: `${STATIC_IMAGES_BASE_URL}/icons/calendar.svg`,
    chat: `${STATIC_IMAGES_BASE_URL}/icons/chat.svg`,
    progress: `${STATIC_IMAGES_BASE_URL}/icons/progress.svg`,
  },

  // 背景画像
  backgrounds: {
    hero: `${STATIC_IMAGES_BASE_URL}/backgrounds/hero-bg.jpg`,
    dashboard: `${STATIC_IMAGES_BASE_URL}/backgrounds/dashboard-bg.jpg`,
    meeting: `${STATIC_IMAGES_BASE_URL}/backgrounds/meeting-bg.jpg`,
  },
}

/**
 * ユーザーのアバター画像を取得
 */
export function getUserAvatar(username: string): string {
  const avatarKey = username.toLowerCase().replace(/[^a-z]/g, "")
  return staticImages.avatars[avatarKey as keyof typeof staticImages.avatars] || staticImages.avatars.default
}

/**
 * グループのイメージを取得
 */
export function getGroupImage(groupName: string): string {
  if (groupName.includes("プログラミング")) return staticImages.groups.programming
  if (groupName.includes("アルゴリズム")) return staticImages.groups.algorithm
  if (groupName.includes("Web") || groupName.includes("ウェブ")) return staticImages.groups.webdev
  if (groupName.includes("データベース")) return staticImages.groups.database
  return staticImages.groups.default
}

/**
 * 画像アップロード処理
 */
export async function uploadImage(file: File, category: "avatars" | "groups" | "attachments"): Promise<string> {
  const formData = new FormData()
  formData.append("file", file)
  formData.append("category", category)

  const response = await fetch("/api/upload", {
    method: "POST",
    body: formData,
  })

  if (!response.ok) {
    throw new Error("画像のアップロードに失敗しました")
  }

  const { url } = await response.json()
  return url
}

/**
 * 画像のリサイズとWebP変換
 */
export function resizeImage(file: File, maxWidth: number, maxHeight: number, quality = 0.8): Promise<string> {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")
    const img = new Image()

    img.onload = () => {
      // アスペクト比を維持してリサイズ
      const { width, height } = calculateAspectRatio(img.width, img.height, maxWidth, maxHeight)

      canvas.width = width
      canvas.height = height

      if (ctx) {
        ctx.drawImage(img, 0, 0, width, height)
        const dataUrl = canvas.toDataURL("image/webp", quality)
        resolve(dataUrl)
      } else {
        reject(new Error("Canvas context not available"))
      }
    }

    img.onerror = () => reject(new Error("Image load failed"))
    img.src = URL.createObjectURL(file)
  })
}

/**
 * アスペクト比を維持したサイズ計算
 */
function calculateAspectRatio(originalWidth: number, originalHeight: number, maxWidth: number, maxHeight: number) {
  const ratio = Math.min(maxWidth / originalWidth, maxHeight / originalHeight)
  return {
    width: Math.round(originalWidth * ratio),
    height: Math.round(originalHeight * ratio),
  }
}

/**
 * 画像プレビュー用のBlob URL生成
 */
export function createImagePreview(file: File): string {
  return URL.createObjectURL(file)
}

/**
 * メモリリーク防止のためのBlob URL削除
 */
export function revokeImagePreview(url: string): void {
  URL.revokeObjectURL(url)
}

/**
 * 画像ファイルの検証
 */
export function validateImageFile(file: File): { valid: boolean; error?: string } {
  const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"]
  const maxSize = 10 * 1024 * 1024 // 10MB

  if (!allowedTypes.includes(file.type)) {
    return { valid: false, error: "JPEG、PNG、WebP、GIF形式の画像のみ対応しています" }
  }

  if (file.size > maxSize) {
    return { valid: false, error: "ファイルサイズは10MB以下にしてください" }
  }

  return { valid: true }
}
