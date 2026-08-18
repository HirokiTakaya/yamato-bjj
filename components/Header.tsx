"use client";
import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { site } from "@/lib/site";
import BrandMark from "./BrandMark";

const DESKTOP = [["#about","academy"],["#firstday","firstday"],["#schedule","schedule"],["#pricing","pricing"],["#contact","visit"]] as const;
const MOBILE = [["#about","academy"],["#training","training"],["#firstday","firstday"],["#schedule","schedule"],["#pricing","pricing"],["#instructor","instructor"],["#faq","faq"],["#contact","visit"]] as const;

export default function Header() {
  const t = useTranslations("Nav");
  const locale = useLocale();
  const pathname = usePathname();
  const other = locale === "en" ? "ja" : "en";
  const [open, setOpen] = useState(false);

  return (
    <>
      <header id="header">
        <div className="wrap nav">
          <a href="#top" className="brand" aria-label="Home">
            <BrandMark />
            <div>
              <div className="brand-name">{site.short}</div>
              <div className="brand-sub">{site.sub} · North Burnaby</div>
            </div>
          </a>
          <nav className="nav-links">
            {DESKTOP.map(([href, k]) => <a key={k} href={href}>{t(k)}</a>)}
          </nav>
          <div className="nav-actions">
            <Link href={pathname} locale={other} className="lang-toggle">
              {locale === "en" ? <><b>EN</b> / JA</> : <>EN / <b>JA</b></>}
            </Link>
            <a href="#contact" className="btn btn-primary nav-cta" data-mag>
              <span className="lbl">{t("freeTrial")}</span>
            </a>
            <button className="burger" aria-label="Menu" onClick={() => setOpen((v) => !v)}>
              <span /><span /><span />
            </button>
          </div>
        </div>
      </header>
      <div className={`mobile-menu${open ? " open" : ""}`}>
        {MOBILE.map(([href, k]) => (
          <a key={k} href={href} onClick={() => setOpen(false)}>{t(k)}</a>
        ))}
      </div>
    </>
  );
}
