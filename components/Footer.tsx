import { useTranslations } from "next-intl";
import { site } from "@/lib/site";
import BrandMark from "./BrandMark";

export default function Footer() {
  const t = useTranslations("Footer");
  const nav = useTranslations("Nav");
  const rakkan = t("rakkan");
  return (
    <footer>
      <div className="wrap">
        <div className="foot-word" aria-hidden="true">{t("word")}</div>
        <div className="foot-grid">
          <div className="foot-brand">
            <a href="#top" className="brand">
              <BrandMark />
              <div>
                <div className="brand-name">{site.short}</div>
                <div className="brand-sub">{site.sub}</div>
              </div>
            </a>
            <p>{t("tagline")}</p>
          </div>
          <div className="foot-col">
            <h4>{t("colTrain")}</h4>
            <a href="#training">{nav("training")}</a>
            <a href="#schedule">{nav("schedule")}</a>
            <a href="#pricing">{nav("pricing")}</a>
            <a href="#contact">{nav("freeTrial")}</a>
          </div>
          <div className="foot-col">
            <h4>{t("colAcademy")}</h4>
            <a href="#about">{nav("academy")}</a>
            <a href="#instructor">{nav("instructor")}</a>
            <a href="#faq">{nav("faq")}</a>
            <a href={site.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>
          </div>
        </div>
        <div className="foot-bottom">
          <p>{site.name} © {new Date().getFullYear()}. {t("rights")}</p>
          <div className="rakkan" aria-hidden="true">
            {rakkan && <span className="rk-txt fude">{rakkan}</span>}
            <span className="rk-seal">柔</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
