import { NextResponse } from "next/server";
import { Resend } from "resend";
import { site } from "@/lib/site";

export const runtime = "nodejs";

type Body = {
  name?: string; email?: string; message?: string;
  day?: string; experience?: string; locale?: string;
  company?: string; // honeypot
};

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
const esc = (v: string) =>
  v.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export async function POST(req: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.BOOKING_TO_EMAIL;
  const from = process.env.BOOKING_FROM_EMAIL ?? "Yamato BJJ <onboarding@resend.dev>";

  if (!apiKey || !to) {
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }

  let b: Body;
  try { b = await req.json(); } catch { return NextResponse.json({ error: "bad_json" }, { status: 400 }); }

  // ボットよけ（人間には見えない項目に入力があれば黙って成功扱い）
  if (b.company) return NextResponse.json({ ok: true });

  const name = (b.name ?? "").trim().slice(0, 120);
  const email = (b.email ?? "").trim().slice(0, 200);
  const message = (b.message ?? "").trim().slice(0, 4000);
  const day = (b.day ?? "").trim().slice(0, 120);
  const experience = (b.experience ?? "").trim().slice(0, 120);
  const ja = b.locale === "ja";

  if (!name || !isEmail(email)) {
    return NextResponse.json({ error: "invalid_input" }, { status: 400 });
  }

  const rows: [string, string][] = [
    [ja ? "お名前" : "Name", name],
    [ja ? "メール" : "Email", email],
    [ja ? "希望クラス" : "Preferred class", day],
    [ja ? "経験" : "Experience", experience],
  ];

  const html = `
    <div style="font-family:system-ui,-apple-system,'Helvetica Neue',sans-serif;color:#1b1a1e;line-height:1.6">
      <h2 style="font-size:18px;margin:0 0 4px">${ja ? "無料体験クラスの申し込み" : "New free trial request"}</h2>
      <p style="margin:0 0 18px;color:#807d76;font-size:13px">${esc(site.name)}</p>
      <table cellpadding="0" cellspacing="0" style="border-collapse:collapse;font-size:14px">
        ${rows.map(([k, v]) => `
          <tr>
            <td style="padding:7px 18px 7px 0;color:#807d76;white-space:nowrap">${esc(k)}</td>
            <td style="padding:7px 0"><strong>${esc(v || "—")}</strong></td>
          </tr>`).join("")}
      </table>
      ${message ? `
        <div style="margin-top:20px;padding:14px 16px;border-left:3px solid #d00000;background:#faf6ee;white-space:pre-wrap;font-size:14px">${esc(message)}</div>
      ` : ""}
      <p style="margin-top:24px;font-size:12px;color:#807d76">
        ${ja ? "このメールに返信すると申込者に直接届きます。" : "Reply to this email to answer them directly."}
      </p>
    </div>`;

  const text = [
    ja ? "無料体験クラスの申し込み" : "New free trial request",
    "",
    ...rows.map(([k, v]) => `${k}: ${v || "—"}`),
    ...(message ? ["", `${ja ? "メッセージ" : "Message"}:`, message] : []),
  ].join("\n");

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to: [to],
      replyTo: email,
      subject: `${ja ? "体験申込" : "Trial request"} — ${name}`,
      html,
      text,
    });
    if (error) {
      console.error("[booking] resend error", error);
      return NextResponse.json({ error: "send_failed" }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[booking] exception", e);
    return NextResponse.json({ error: "send_failed" }, { status: 502 });
  }
}