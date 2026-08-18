import { useTranslations } from "next-intl";

export default function Hero() {
  const t = useTranslations("Hero");
  const kanji = t("kanji");
  return (
    <section className="hero in" id="hero">
      {kanji && <div className="hero-kanji kanji" id="heroKanji" aria-hidden="true">{kanji}</div>}
      <div className="wrap">
        <div className="hero-inner">
          <span className="eyebrow">{t("eyebrow")}</span>
          <h1 className="display">
            <span className="lm"><span className="li" dangerouslySetInnerHTML={{ __html: t("l1") }} /></span>
            <span className="lm"><span className="li" dangerouslySetInnerHTML={{ __html: t("l2") }} /></span>
          </h1>
          <p className="lead fadeup d2">{t("lead")}</p>
          <div className="hero-cta fadeup d3">
            <a href="#contact" className="btn btn-primary" data-mag>
              <span className="lbl">{t("cta1")} <span className="arr">→</span></span>
            </a>
            <a href="#schedule" className="btn btn-ghost" data-mag>
              <span className="lbl">{t("cta2")}</span>
            </a>
          </div>
        </div>
      </div>
      <div className="scroll-cue"><span className="ln" /><span>{t("scroll")}</span></div>
    </section>
  );
}
