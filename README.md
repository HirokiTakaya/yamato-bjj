# Advantage and Yamato Brazilian Jiu-Jitsu — Website

北バーナビーの No-Gi ブラジリアン柔術アカデミー公式サイト。
**Next.js 16 (App Router) + next-intl (`/en` `/ja`) + TypeScript**。Vercel デプロイ前提。

## セットアップ
```bash
npm install
npm run dev     # http://localhost:3000 → /en へリダイレクト
npm run build   # /en と /ja を静的生成（SSG）
```

## デプロイ（Vercel）
1. このフォルダを GitHub リポジトリに push
2. Vercel で Import（フレームワークは自動検出）
3. デプロイ後、`lib/site.ts` の `url` を本番ドメインに更新して再デプロイ
   （`url` は hreflang / OGP / 構造化データに使われます）

## ドメインとメール（`lib/site.ts`）
| 項目 | 現在の値 | 備考 |
|---|---|---|
| `url` | `https://yamato-bjj.vercel.app` | Vercel の既定ドメイン。独自ドメイン取得後に差し替え |
| `email` | 空文字（未設定） | **設定すると予約フォームがメール送信に切り替わります** |

`email` が空の間、予約ボタンは自動的に **Instagram DM** へ誘導します
（存在しないアドレス宛のメールが送られる事故を防ぐため）。
受信用メールを用意したら `site.email` に入れるだけで、
入力内容が整形されたメールが開く本来の挙動になります。

## 編集ガイド
| 変えたいもの | ファイル |
|---|---|
| 英語のコピー | `messages/en.json` |
| 日本語のコピー | `messages/ja.json` |
| 連絡先・住所・クラス曜日/時間 | `lib/site.ts` |
| 配色・余白・装飾 | `app/globals.css`（`:root` の CSS 変数） |
| 各セクションの構造 | `components/*.tsx` |
| 写真・ロゴ | `public/instructor.jpg` / `public/logo.png` |

### クラス曜日・時間を変える
`lib/site.ts` の `classDays`（0=日 … 1=月, 3=水）と `classStart` / `classEnd` を変更すると、
カウントダウンと「Next」バッジが自動追従します。表示テキストは `messages/*.json` の `Schedule` を編集。

## 多言語の方針
- `/en` と `/ja` の 2 ロケール。URL 分割なので Google が別ページとして索引し、`hreflang` も自動出力。
- **英語ページに日本語は出しません。** 装飾漢字・漢数字・掛け軸の縦書きはすべて `messages/ja.json` 側にのみ存在し、
  `messages/en.json` では空文字または英語表記になっています（ロゴの「柔」印のみ例外）。

## 主な機能
- **次回クラスのカウントダウン**（`components/Countdown.tsx`）— 月・水 20:30 を自動判定。開催中は「クラス開催中」表示。
- **予約フォーム**（`components/BookingForm.tsx`）— 希望クラス・経験レベルを選ぶと整形済みメールが開く。バックエンド不要。
- **SEO** — ロケール別メタ / OGP / `SportsActivityLocation` 構造化データ（住所・営業時間・全料金）。
- **モーション** — イントロ、スクロール進捗、カスタムカーソル、マグネティックCTA、3Dチルト、ドットナビ。
  すべて `prefers-reduced-motion` とタッチ端末で自動オフ。

## 今後の拡張候補
- 予約をメール送信ではなく API Route + DB / スプレッドシート連携に
- 練習風景の写真追加、生徒の声（社会的証明）
- OGP 画像（現在はテキストのみ）
