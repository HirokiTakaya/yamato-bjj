"use client";
import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { site, hasEmail } from "@/lib/site";

type Status = "idle" | "sending" | "ok" | "error";

export default function BookingForm() {
  const t = useTranslations("Form");
  const locale = useLocale();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [day, setDay] = useState(0);
  const [exp, setExp] = useState(0);
  const [status, setStatus] = useState<Status>("idle");
  const [company, setCompany] = useState(""); // honeypot

  const days = [t("mon"), t("wed"), t("either")];
  const dayVals = [t("monV"), t("wedV"), t("eitherV")];
  const exps = [t("e1"), t("e2"), t("e3")];
  const expVals = [t("e1V"), t("e2V"), t("e3V")];

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const canSend = name.trim().length > 0 && emailValid && status !== "sending";

  const bodyLines = () => {
    const l = [
      `${t("mailName")}: ${name.trim() || t("mailBlank")}`,
      `${t("mailEmail")}: ${email.trim() || t("mailBlank")}`,
      `${t("mailDay")}: ${dayVals[day]}`,
      `${t("mailExp")}: ${expVals[exp]}`,
    ];
    if (msg.trim()) l.push("", `${t("mailNotes")}:`, msg.trim());
    return l;
  };

  const mailtoHref = () => {
    const lines = [t("mailGreeting"), "", t("mailIntro"), "", ...bodyLines(), "", t("mailClose")];
    return `mailto:${site.email}?subject=${encodeURIComponent(t("mailSubject"))}&body=${encodeURIComponent(lines.join("\n"))}`;
  };

  async function submit(e: React.MouseEvent) {
    e.preventDefault();
    if (!canSend) return;
    setStatus("sending");
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          message: msg.trim(),
          day: dayVals[day],
          experience: expVals[exp],
          locale,
          company,
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("ok");
    } catch {
      setStatus("error");
    }
  }

  // 送信完了
  if (status === "ok") {
    return (
      <div className="bform" id="bform">
        <div className="bdone">
          <span className="bdone-mark">柔</span>
          <h3>{t("okTitle")}</h3>
          <p>{t("okBody")}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bform" id="bform">
      <h3>{t("title")}</h3>
      <p className="bsub">{t("sub")}</p>

      <div className="fld">
        <label htmlFor="fName">{t("name")}</label>
        <input id="fName" type="text" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} />
      </div>

      <div className="fld">
        <label htmlFor="fEmail">{t("email")}</label>
        <input id="fEmail" type="email" inputMode="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>

      {/* bot honeypot — 人間には見えない */}
      <input type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" value={company}
        onChange={(e) => setCompany(e.target.value)} className="hp" />

      <div className="fld">
        <label>{t("dayL")}</label>
        <div className="chips">
          {days.map((d, i) => (
            <span key={i} className={`chip${day === i ? " on" : ""}`} role="button" tabIndex={0}
              onClick={() => setDay(i)}
              onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setDay(i); } }}>{d}</span>
          ))}
        </div>
      </div>

      <div className="fld">
        <label>{t("expL")}</label>
        <div className="chips">
          {exps.map((x, i) => (
            <span key={i} className={`chip${exp === i ? " on" : ""}`} role="button" tabIndex={0}
              onClick={() => setExp(i)}
              onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setExp(i); } }}>{x}</span>
          ))}
        </div>
      </div>

      <div className="fld">
        <label htmlFor="fMsg">{t("msgL")}</label>
        <textarea id="fMsg" value={msg} onChange={(e) => setMsg(e.target.value)} />
      </div>

      <button type="button" className="btn btn-primary" onClick={submit} disabled={!canSend} data-mag>
        <span className="lbl">{status === "sending" ? t("sending") : t("send")} <span className="arr">→</span></span>
      </button>
      {status === "error" && (
        <p className="bmsg err">
          {t("errBody")}{" "}
          <a href={site.instagram} target="_blank" rel="noopener noreferrer">{site.instagramHandle}</a>
          {hasEmail && <> · <a href={mailtoHref()}>{site.email}</a></>}
        </p>
      )}

      <p className="bnote">{t("note")}</p>
    </div>
  );
}