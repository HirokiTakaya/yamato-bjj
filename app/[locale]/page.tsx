import { setRequestLocale, getTranslations } from "next-intl/server";
import { site } from "@/lib/site";
import Interactions from "@/components/Interactions";
import Intro from "@/components/Intro";
import DotNav from "@/components/DotNav";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import BeltStrip from "@/components/BeltStrip";
import About from "@/components/About";
import Programs from "@/components/Programs";
import Who from "@/components/Who";
import Philosophy from "@/components/Philosophy";
import Schedule from "@/components/Schedule";
import FirstDay from "@/components/FirstDay";
import Pricing from "@/components/Pricing";
import Instructor from "@/components/Instructor";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  await getTranslations({ locale, namespace: "Meta" });

  return (
    <>
      <Interactions />
      <Intro name={site.short} />
      <DotNav />
      <Header />
      <main id="top">
        <Hero />
        <BeltStrip />
        <About />
        <div className="belt-div" />
        <Programs />
        <Who />
        <Philosophy />
        <div className="belt-div" />
        <Schedule />
        <div className="belt-div" />
        <FirstDay />
        <Pricing />
        <div className="belt-div" />
        <Instructor />
        <FAQ />
        <div className="belt-div" />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
