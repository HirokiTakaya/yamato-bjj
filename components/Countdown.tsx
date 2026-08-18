"use client";
import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { site } from "@/lib/site";

type State = { live: true; day: number } | { live: false; day: number; t: Date } | null;

function nextClass(now = new Date()): State {
  const days = site.classDays as readonly number[];
  if (days.includes(now.getDay())) {
    const s = new Date(now); s.setHours(site.classStart.h, site.classStart.m, 0, 0);
    const e = new Date(now); e.setHours(site.classEnd.h, site.classEnd.m, 0, 0);
    if (now >= s && now < e) return { live: true, day: now.getDay() };
  }
  let best: State = null;
  for (let i = 0; i < 14; i++) {
    const d = new Date(now); d.setDate(now.getDate() + i);
    if (days.includes(d.getDay())) {
      d.setHours(site.classStart.h, site.classStart.m, 0, 0);
      if (d > now && (!best || (best.live === false && d < best.t))) best = { live: false, day: d.getDay(), t: d };
    }
  }
  return best;
}

/** 次回クラスのカウントダウン。該当行に is-next / is-live を付与する。 */
export default function Countdown() {
  const t = useTranslations("Schedule");
  const locale = useLocale();
  const [state, setState] = useState<State>(null);

  useEffect(() => {
    const tick = () => setState(nextClass());
    tick();
    const id = setInterval(tick, 30000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    document.querySelectorAll(".class-row").forEach((r) => r.classList.remove("is-next", "is-live"));
    if (!state) return;
    const row = document.querySelector(`.class-row[data-day="${state.day}"]`);
    row?.classList.add(state.live ? "is-live" : "is-next");
  }, [state]);

  if (!state) return <div className="countdown"><span className="cdk">{t("cd")}</span><span className="cdv">—</span></div>;
  if (state.live) {
    return <div className="countdown live"><span className="cdk">{t("cdLive")}</span><span className="cdv">{t("cdLiveV")}</span></div>;
  }
  const ms = state.t.getTime() - Date.now();
  const d = Math.floor(ms / 864e5), h = Math.floor((ms % 864e5) / 36e5), m = Math.floor((ms % 36e5) / 6e4);
  const v = locale === "ja" ? `${d}日 ${h}時間 ${String(m).padStart(2, "0")}分` : `${d}d ${h}h ${String(m).padStart(2, "0")}m`;
  return <div className="countdown"><span className="cdk">{t("cd")}</span><span className="cdv">{v}</span></div>;
}
