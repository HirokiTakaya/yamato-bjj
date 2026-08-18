import { useTranslations } from "next-intl";
import Reveal from "./Reveal";
import Heading from "./Heading";
import Countdown from "./Countdown";

export default function Schedule() {
  const t = useTranslations("Schedule");
  const mark = t("mark");
  return (
    <section className="block sched" id="schedule">
      <span className="ghostno">{t("no")}</span>
      <div className="wrap">
        <Reveal className="sec-head reveal">
          <span className="eyebrow"><span className="no">{t("no")}</span><span>{t("eyebrow")}</span></span>
          <Heading lines={[t("h1")]} />
          <p>{t("sub")}</p>
        </Reveal>
        <Reveal className="sched-grid reveal">
          <div className="sched-feat">
            <span className="nlabel"><span className="pulse" /><span>{t("open")}</span></span>
            <div className="class-rows">
              <div className="class-row" data-day="1">
                <span className="cr-day">{t("mon")}</span>
                <span className="cr-time">{t("time")}</span>
                <span className="cr-next">{t("next")}</span>
              </div>
              <div className="class-row" data-day="3">
                <span className="cr-day">{t("wed")}</span>
                <span className="cr-time">{t("time")}</span>
                <span className="cr-next">{t("next")}</span>
              </div>
            </div>
            <div className="cr-name">{t("name")}</div>
            <Countdown />
            <div>
              <a href="#contact" className="btn btn-primary" data-mag>
                <span className="lbl">{t("reserve")} <span className="arr">→</span></span>
              </a>
            </div>
            {mark && <span className="fk kanji">{mark}</span>}
          </div>
          <div className="sched-side">
            <span className="plus">+</span>
            <span className="ml">{t("moreL")}</span>
            <span className="mt">{t("moreT")}</span>
          </div>
        </Reveal>
        <p className="sched-note">{t("note")}</p>
      </div>
    </section>
  );
}
