import { useTranslations } from "next-intl";
import Reveal from "./Reveal";
import Heading from "./Heading";
type Tier = { n: string; p: string; u: string; tag: string; feat: boolean; items: string[]; cta: string };

export default function Pricing() {
  const t = useTranslations("Pricing");
  const tiers = t.raw("tiers") as Tier[];
  const mark = t("mark");
  return (
    <section className="block" id="pricing">
      <span className="ghostno">{t("no")}</span>
      {mark && <span className="watermark kanji" style={{ right: "-3%", bottom: "2%" }}>{mark}</span>}
      <div className="wrap">
        <Reveal className="sec-head reveal">
          <span className="eyebrow"><span className="no">{t("no")}</span><span>{t("eyebrow")}</span></span>
          <Heading lines={[t("h1")]} />
          <p>{t("sub")}</p>
        </Reveal>
        <Reveal className="price-grid stagger">
          {tiers.map((x, i) => (
            <div className={`price tilt${x.feat ? " feat" : ""}`} key={i}>
              {x.tag && <span className="tag">{x.tag}</span>}
              <h3>{x.n}</h3>
              <div className="amt">{x.p}{x.u && <span> {x.u}</span>}</div>
              <ul>{x.items.map((li, j) => <li key={j}>{li}</li>)}</ul>
              <a href="#contact" className={`btn ${x.feat ? "btn-primary" : "btn-ghost"}`} data-mag>
                <span className="lbl">{x.cta}</span>
              </a>
            </div>
          ))}
        </Reveal>
        <Reveal className="pl-strip reveal">
          <div className="pl-head">
            <h3>{t("plTitle")}</h3>
            <p>{t("plSub")}</p>
          </div>
          <div className="pl-prices">
            <div className="pl-p"><span className="amt2">$120</span><span className="pl-l">{t("plMember")}</span></div>
            <div className="pl-p"><span className="amt2">$150</span><span className="pl-l">{t("plNon")}</span></div>
          </div>
          <a href="#contact" className="btn btn-ghost" data-mag><span className="lbl">{t("plCta")}</span></a>
        </Reveal>
        <p className="price-note">{t("studentNote")}</p>
      </div>
    </section>
  );
}
