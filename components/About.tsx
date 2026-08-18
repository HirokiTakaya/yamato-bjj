import { useTranslations } from "next-intl";
import Reveal from "./Reveal";
import Heading from "./Heading";

export default function About() {
  const t = useTranslations("About");
  const mark = t("mark");
  return (
    <section className="block about" id="about">
      <span className="ghostno">{t("no")}</span>
      {mark && <span className="watermark kanji" style={{ left: "-3%", top: "4%" }}>{mark}</span>}
      <div className="wrap about-grid">
        <Reveal className="about-copy reveal">
          <span className="eyebrow"><span className="no">{t("no")}</span><span>{t("eyebrow")}</span></span>
          <div className="sec-head" style={{ marginBottom: 26 }}>
            <Heading lines={[t("h1"), t("h2")]} />
          </div>
          <p dangerouslySetInnerHTML={{ __html: t("p1") }} />
          <p dangerouslySetInnerHTML={{ __html: t("p2") }} />
        </Reveal>
        <Reveal className="about-stats reveal">
          <div className="stat"><div className="num">8+</div><div className="lbl">{t("s1")}</div></div>
          <div className="stat"><div className="num">100%</div><div className="lbl">{t("s2")}</div></div>
          <div className="stat"><div className="num">{t("s3v")}</div><div className="lbl">{t("s3")}</div></div>
          <div className="stat"><div className="num">{t("s4v")}</div><div className="lbl">{t("s4")}</div></div>
        </Reveal>
      </div>
    </section>
  );
}
