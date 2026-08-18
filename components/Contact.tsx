import Image from "next/image";
import { useTranslations } from "next-intl";
import { site } from "@/lib/site";
import Reveal from "./Reveal";
import Heading from "./Heading";
import BookingForm from "./BookingForm";

export default function Contact() {
  const t = useTranslations("Contact");
  const bring = t.raw("bring") as string[];
  return (
    <section className="block" id="contact">
      <span className="ghostno">{t("no")}</span>
      <div className="wrap">
        <Reveal className="sec-head reveal">
          <span className="eyebrow"><span className="no">{t("no")}</span><span>{t("eyebrow")}</span></span>
          <Heading lines={[t("h1")]} />
          <p>{t("sub")}</p>
        </Reveal>
        <div className="contact-grid">
          <Reveal className="reveal" style={{ gridColumn: "1/-1" }}>
            <div className="collab">
              <Image src="/logo.png" alt={site.name} width={118} height={118} />
              <div>
                <div className="ck">{t("badgeK")}</div>
                <div className="ct">{t("badgeT")}</div>
                <p>{t("badgeP")}</p>
              </div>
            </div>
          </Reveal>

          <Reveal className="map-ph reveal">
            <div className="pin">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M12 22s7-6.4 7-12A7 7 0 0 0 5 10c0 5.6 7 12 7 12Z" fill="#d00000" />
                <circle cx="12" cy="10" r="2.6" fill="#ffffff" />
              </svg>
              <span className="pulse" />
            </div>
            <span className="ph-tag">{t("mapTag")}</span>
          </Reveal>

          <Reveal className="reveal">
            <div className="info-row">
              <span className="ic">◷</span>
              <div>
                <div className="k">{t("hoursK")}</div>
                <div className="v">{t("hoursV")}<br /><small>{t("hoursS")}</small></div>
              </div>
            </div>
            <div className="info-row">
              <span className="ic">⚲</span>
              <div>
                <div className="k">{t("locK")}</div>
                <div className="v">{t("locV")}<br /><small>{t("locS")}</small></div>
              </div>
            </div>
            <div className="info-row">
              <span className="ic">☷</span>
              <div>
                <div className="k">{t("igK")}</div>
                <div className="v">
                  <a href={site.instagram} target="_blank" rel="noopener noreferrer">{site.instagramHandle}</a>
                </div>
              </div>
            </div>

            <div style={{ marginTop: 32 }}><BookingForm /></div>

            <div className="bring">
              <h4>{t("bringH")}</h4>
              <div className="bring-list">{bring.map((b, i) => <span key={i}>{b}</span>)}</div>
              <p>{t("bringNote")}</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
