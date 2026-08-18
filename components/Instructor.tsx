import Image from "next/image";
import { useTranslations } from "next-intl";
import Reveal from "./Reveal";

export default function Instructor() {
  const t = useTranslations("Instructor");
  return (
    <section className="block instr" id="instructor">
      <span className="ghostno">{t("no")}</span>
      <div className="wrap instr-grid">
        <Reveal className="portrait reveal">
          <Image className="pimg" src="/instructor.jpg" alt={t("alt")} fill sizes="(max-width:920px) 90vw, 34vw" priority />
        </Reveal>
        <Reveal className="instr-copy reveal">
          <span className="role">{t("role")}</span>
          <h2 className="display">{t("name")}</h2>
          <p>{t("p1")}</p>
          <p>{t("p2")}</p>
        </Reveal>
      </div>
    </section>
  );
}
