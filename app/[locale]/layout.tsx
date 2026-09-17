import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { site } from "@/lib/site";
import "../globals.css";

type P = { locale: string };
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<P> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Meta" });
  return {
    metadataBase: new URL(site.url),
    title: t("title"),
    description: t("description"),
    alternates: { canonical: `/${locale}`, languages: { en: "/en", ja: "/ja" } },
    openGraph: {
      title: t("ogTitle"),
      description: t("ogDesc"),
      type: "website",
      siteName: site.name,
      url: `${site.url}/${locale}`,
      locale: locale === "ja" ? "ja_JP" : "en_CA",
    },
    icons: {
      icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 120'%3E%3Ccircle cx='60' cy='60' r='60' fill='%23131316'/%3E%3Ccircle cx='60' cy='60' r='50' fill='none' stroke='%23fff' stroke-width='3'/%3E%3Ccircle cx='84' cy='38' r='13' fill='%23d00000'/%3E%3Ctext x='58' y='80' font-size='58' font-family='serif' font-weight='700' fill='%23fff' text-anchor='middle'%3E%E6%9F%94%3C/text%3E%3C/svg%3E",
    },
  };
}

export default async function LocaleLayout({
  children, params,
}: { children: React.ReactNode; params: Promise<P> }) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SportsActivityLocation",
    name: site.name,
    description:
      "Beginner-friendly No-Gi Brazilian Jiu-Jitsu academy in North Burnaby, BC. Taught in English with Japanese support.",
    sport: "Brazilian Jiu-Jitsu",
    url: `${site.url}/${locale}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      postalCode: site.address.postal,
      addressCountry: site.address.country,
    },
    openingHoursSpecification: [
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Monday", opens: "20:30", closes: "21:30" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Wednesday", opens: "20:30", closes: "21:30" },
    ],
    sameAs: [site.instagram],
    makesOffer: [
      { "@type": "Offer", name: "Monthly Membership", price: "125", priceCurrency: "CAD" },
      { "@type": "Offer", name: "Drop-In", price: "40", priceCurrency: "CAD" },
      { "@type": "Offer", name: "Private Lesson (member)", price: "120", priceCurrency: "CAD" },
      { "@type": "Offer", name: "Private Lesson (non-member)", price: "150", priceCurrency: "CAD" },
    ],
  };

  return (
    <html lang={locale} className={locale === "ja" ? "lang-ja" : undefined}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              // data 属性にする（React は className を管理するため class だと上書きで消える）。
              // 3秒経ってもハイドレーションが完了しなければフラグを外し、必ず本文を表示する。
              "var d=document.documentElement;d.setAttribute('data-js','');" +
              "setTimeout(function(){if(!window.__ayReady){d.removeAttribute('data-js')}},3000)",
          }}
        />
        <meta name="color-scheme" content="only light" />
        <meta name="theme-color" content="#faf6ee" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Serif+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Archivo:wght@400;500;600;700&family=Noto+Serif+JP:wght@400;600;800;900&family=Noto+Sans+JP:wght@400;500;700&family=Yuji+Syuku&display=swap"
          rel="stylesheet"
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className={locale === "ja" ? "lang-ja" : undefined}>
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
