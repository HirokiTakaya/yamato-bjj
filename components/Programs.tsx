import { useTranslations } from "next-intl";
import Reveal from "./Reveal";
import Heading from "./Heading";
type Item = { t: string; jp: string; mark: string; d: string };

export default function Programs() {
  const tr = useTranslations("Train");
  const items = tr.raw("items") as Item[];
  return (
    <section className="block" id="training">
      <span className="ghostno">{tr("no")}</span>
      <div className="wrap">
        <Reveal className="sec-head reveal">
          <span className="eyebrow"><span className="no">{tr("no")}</span><span>{tr("eyebrow")}</span></span>
          <Heading lines={[tr("h1"), tr("h2")]} />
          <p>{tr("sub")}</p>
        </Reveal>
        <Reveal className="prog-grid stagger">
          {items.map((it, i) => (
            <div className="prog tilt" key={i}>
              <div className="pidx">{String(i + 1).padStart(2, "0")}</div>
              <h3>{it.t}</h3>
              {it.jp && <div className="pja kanji">{it.jp}</div>}
              <p>{it.d}</p>
              {it.mark && <div className="pmark kanji">{it.mark}</div>}
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
