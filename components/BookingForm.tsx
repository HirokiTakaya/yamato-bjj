"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { site, hasEmail } from "@/lib/site";

export default function BookingForm() {
  const t = useTranslations("Form");
  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");
  const [day, setDay] = useState(0);
  const [exp, setExp] = useState(0);

  const days = [t("mon"), t("wed"), t("either")];
  const dayVals = [t("monV"), t("wedV"), t("eitherV")];
  const exps = [t("e1"), t("e2"), t("e3")];
  const expVals = [t("e1V"), t("e2V"), t("e3V")];

  const compose = () => {
    const lines = [
      t("mailGreeting"), "", t("mailIntro"), "",
      `${t("mailName")}: ${name.trim() || t("mailBlank")}`,
      `${t("mailDay")}: ${dayVals[day]}`,
      `${t("mailExp")}: ${expVals[exp]}`,
    ];
    if (msg.trim()) lines.push("", `${t("mailNotes")}:`, msg.trim());
    lines.push("", t("mailClose"));
    return `mailto:${site.email}?subject=${encodeURIComponent(t("mailSubject"))}&body=${encodeURIComponent(lines.join("\n"))}`;
  };

  const href = hasEmail ? compose() : site.instagram;

  return (
    <div className="bform" id="bform">
      <h3>{t("title")}</h3>
      <p className="bsub">{t("sub")}</p>

      <div className="fld">
        <label htmlFor="fName">{t("name")}</label>
        <input id="fName" type="text" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} />
      </div>

      <div className="fld">
        <label>{t("dayL")}</label>
        <div className="chips">
          {days.map((d, i) => (
            <span key={i} className={`chip${day === i ? " on" : ""}`} onClick={() => setDay(i)} role="button" tabIndex={0}
              onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setDay(i); } }}>{d}</span>
          ))}
        </div>
      </div>

      <div className="fld">
        <label>{t("expL")}</label>
        <div className="chips">
          {exps.map((x, i) => (
            <span key={i} className={`chip${exp === i ? " on" : ""}`} onClick={() => setExp(i)} role="button" tabIndex={0}
              onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setExp(i); } }}>{x}</span>
          ))}
        </div>
      </div>

      <div className="fld">
        <label htmlFor="fMsg">{t("msgL")}</label>
        <textarea id="fMsg" value={msg} onChange={(e) => setMsg(e.target.value)} />
      </div>

      <a href={href} target={hasEmail ? undefined : "_blank"} rel={hasEmail ? undefined : "noopener noreferrer"} className="btn btn-primary" data-mag>
        <span className="lbl">{hasEmail ? t("submit") : t("submitIg")} <span className="arr">→</span></span>
      </a>
      <p className="bnote">{t("note")}</p>
    </div>
  );
}
