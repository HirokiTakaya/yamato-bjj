import { useTranslations } from "next-intl";
import Reveal from "./Reveal";
import Heading from "./Heading";

export default function Who() {
  const t = useTranslations("Who");
  const items = t.raw("items") as string[];
  return (
    <section className="block" id="who" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <Reveal className="sec-head reveal">
          <span className="eyebrow"><span className="no">{t("no")}</span><span>{t("eyebrow")}</span></span>
          <Heading lines={[t("h1"), t("h2")]} />
        </Reveal>
        <Reveal className="who-grid stagger">
          {items.map((x, i) => (
            <div className="who-card" key={i}><span className="chk">✦</span><span className="t">{x}</span></div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
