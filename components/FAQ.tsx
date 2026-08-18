import { useTranslations } from "next-intl";
import Reveal from "./Reveal";
import Heading from "./Heading";
type QA = { q: string; a: string };

export default function FAQ() {
  const t = useTranslations("FAQ");
  const items = t.raw("items") as QA[];
  const half = Math.ceil(items.length / 2);
  const cols = [items.slice(0, half), items.slice(half)];
  return (
    <section className="block sched" id="faq">
      <span className="ghostno">{t("no")}</span>
      <div className="wrap">
        <Reveal className="sec-head reveal">
          <span className="eyebrow"><span className="no">{t("no")}</span><span>{t("eyebrow")}</span></span>
          <Heading lines={[t("h1")]} />
        </Reveal>
        <Reveal className="faq reveal">
          {cols.map((col, ci) => (
            <div key={ci}>
              {col.map((x, i) => (
                <details key={i}>
                  <summary>{x.q}</summary>
                  <div className="fa">{x.a}</div>
                </details>
              ))}
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
