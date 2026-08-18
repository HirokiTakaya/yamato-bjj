import { useTranslations } from "next-intl";
import Reveal from "./Reveal";
import Heading from "./Heading";
type Step = { n: string; time: string; t: string; d: string };

export default function FirstDay() {
  const tr = useTranslations("FirstDay");
  const steps = tr.raw("steps") as Step[];
  return (
    <section className="block" id="firstday">
      <span className="ghostno">{tr("no")}</span>
      <div className="wrap">
        <Reveal className="sec-head reveal">
          <span className="eyebrow"><span className="no">{tr("no")}</span><span>{tr("eyebrow")}</span></span>
          <Heading lines={[tr("h1"), tr("h2")]} />
          <p>{tr("sub")}</p>
        </Reveal>
        <Reveal className="steps stagger">
          {steps.map((s, i) => (
            <div className="step" key={i}>
              <span className="stime">{s.time}</span>
              <span className="sn">{s.n}</span>
              <h3>{s.t}</h3>
              <p>{s.d}</p>
            </div>
          ))}
        </Reveal>
        <p className="steps-note">{tr("note")}</p>
      </div>
    </section>
  );
}
