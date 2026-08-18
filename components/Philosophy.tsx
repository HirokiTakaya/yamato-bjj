import { useTranslations } from "next-intl";
import Reveal from "./Reveal";

export default function Philosophy() {
  const t = useTranslations("Philosophy");
  const kanji = t("kanji");
  return (
    <section className="philosophy" id="philosophy">
      {kanji && <span className="phil-kanji">{kanji}</span>}
      <Reveal className="wrap phil-inner reveal">
        <span className="eyebrow">{t("eyebrow")}</span>
        <div className="kakejiku">
          <span className="kk-rod kk-top" />
          <p className="maxim">{t("maxim")}</p>
          <span className="kk-seal">柔</span>
          <span className="kk-rod kk-bot" />
        </div>
        <p className="romaji">{t("romaji")}</p>
        <p className="maxim-tr">{t("tr")}</p>
      </Reveal>
    </section>
  );
}
