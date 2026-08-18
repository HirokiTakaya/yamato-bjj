/** サイト共通設定。ドメイン確定後に url を更新してください。 */
export const site = {
  name: "Advantage and Yamato Brazilian Jiu-Jitsu",
  short: "Advantage & Yamato",
  sub: "Brazilian Jiu-Jitsu",
  /** [TODO] 本番の受信用メール。未設定（空文字）の間は予約ボタンが Instagram DM に切り替わります。 */
  email: "",
  url: "https://yamato-bjj.vercel.app", // Vercel の既定ドメイン。独自ドメイン取得後に差し替え
  instagram: "https://www.instagram.com/advantage_yamatobjj/",
　instagramHandle: "@advantage_yamatobjj",
  address: { street: "5680 Hastings St", city: "Burnaby", region: "BC", postal: "V5B 1R4", country: "CA" },
  classDays: [1, 3],                    // 月=1, 水=3
  classStart: { h: 20, m: 30 },
  classEnd: { h: 21, m: 30 },
} as const;

/** 予約導線: メール未設定なら Instagram にフォールバック */
export const hasEmail = site.email.length > 0;
