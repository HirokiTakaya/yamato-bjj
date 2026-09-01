/** サイト共通設定。ドメイン確定後に url を更新してください。 */
export const site = {
  name: "Advantage and Yamato Brazilian Jiu-Jitsu",
  short: "Advantage & Yamato",
  sub: "Brazilian Jiu-Jitsu",
  /** 受信用メール。フォーム送信が使えない場合の直接連絡先として表示されます。 */
  email: "",
  url: "https://yamato-bjj.vercel.app", // Vercel の既定ドメイン。独自ドメイン取得後に差し替え
  instagram: "https://www.instagram.com/advantage_yamatobjj/",
  instagramHandle: "@advantage_yamatobjj",
  address: { street: "5680 Hastings St", city: "Burnaby", region: "BC", postal: "V5B 1R4", country: "CA" },
  classDays: [1, 3],                    // 月=1, 水=3
  classStart: { h: 20, m: 30 },
  classEnd: { h: 21, m: 30 },
} as const;

export const hasEmail = site.email.length > 0;

/**
 * 予約フォームは /api/booking (Resend) 経由で送信します。
 * Vercel の Environment Variables に以下を設定してください（サーバー側のみ・公開されません）:
 *   RESEND_API_KEY      … Resend の API キー
 *   BOOKING_TO_EMAIL    … 受信したいメールアドレス
 *   BOOKING_FROM_EMAIL  … 任意。独自ドメイン検証後に "Yamato BJJ <hello@example.ca>" などへ
 * 未設定でも画面は壊れず、送信時に Instagram への導線が出ます。
 */