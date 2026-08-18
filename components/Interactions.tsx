"use client";
import { useEffect } from "react";

/** イントロ / スクロール進捗 / カスタムカーソル / マグネティック / 3Dチルト / ドットナビ */
export default function Interactions() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(pointer: fine)").matches;
    const cleanups: Array<() => void> = [];

    // intro
    const intro = document.getElementById("intro");
    const t = window.setTimeout(() => {
      intro?.classList.add("done");
      document.body.classList.add("ready");
    }, reduce ? 0 : 1800);
    cleanups.push(() => clearTimeout(t));

    // scroll: header + progress + hero parallax
    const header = document.getElementById("header");
    const prog = document.getElementById("progress");
    const heroKanji = document.getElementById("heroKanji");
    const onScroll = () => {
      const y = window.scrollY;
      header?.classList.toggle("scrolled", y > 40);
      const h = document.documentElement.scrollHeight - window.innerHeight;
      if (prog) prog.style.width = (h > 0 ? (y / h) * 100 : 0) + "%";
      if (!reduce && heroKanji) heroKanji.style.transform = `translateY(calc(-50% + ${y * 0.12}px))`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    cleanups.push(() => window.removeEventListener("scroll", onScroll));

    // dot nav
    const dots = Array.from(document.querySelectorAll<HTMLAnchorElement>(".dotnav a"));
    const map: Record<string, HTMLAnchorElement> = {};
    dots.forEach((d) => (map[d.getAttribute("href")!.slice(1)] = d));
    const so = new IntersectionObserver((es) => {
      es.forEach((e) => {
        if (e.isIntersecting) {
          dots.forEach((d) => d.classList.remove("active"));
          map[e.target.id]?.classList.add("active");
        }
      });
    }, { rootMargin: "-45% 0px -45% 0px" });
    Object.keys(map).forEach((id) => { const s = document.getElementById(id); if (s) so.observe(s); });
    cleanups.push(() => so.disconnect());

    if (fine && !reduce) {
      // cursor
      document.body.classList.add("has-cursor");
      const ring = document.querySelector<HTMLElement>(".cursor");
      const dot = document.querySelector<HTMLElement>(".cursor-dot");
      let mx = innerWidth / 2, my = innerHeight / 2, rx = mx, ry = my, raf = 0;
      const onMove = (e: MouseEvent) => {
        mx = e.clientX; my = e.clientY;
        if (dot) dot.style.transform = `translate(${mx}px,${my}px) translate(-50%,-50%)`;
      };
      addEventListener("mousemove", onMove);
      const loop = () => {
        rx += (mx - rx) * 0.18; ry += (my - ry) * 0.18;
        if (ring) ring.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%)`;
        raf = requestAnimationFrame(loop);
      };
      loop();
      const hot = Array.from(document.querySelectorAll("a,button,.who-card,.prog,.price"));
      const on = () => ring?.classList.add("hot");
      const off = () => ring?.classList.remove("hot");
      hot.forEach((el) => { el.addEventListener("mouseenter", on); el.addEventListener("mouseleave", off); });
      cleanups.push(() => {
        removeEventListener("mousemove", onMove); cancelAnimationFrame(raf);
        hot.forEach((el) => { el.removeEventListener("mouseenter", on); el.removeEventListener("mouseleave", off); });
        document.body.classList.remove("has-cursor");
      });

      // magnetic buttons
      document.querySelectorAll<HTMLElement>("[data-mag]").forEach((btn) => {
        const lbl = btn.querySelector<HTMLElement>(".lbl") ?? btn;
        const mm = (e: MouseEvent) => {
          const r = btn.getBoundingClientRect();
          const x = e.clientX - r.left - r.width / 2, y = e.clientY - r.top - r.height / 2;
          btn.style.transform = `translate(${x * 0.25}px,${y * 0.35}px)`;
          lbl.style.transform = `translate(${x * 0.12}px,${y * 0.18}px)`;
        };
        const ml = () => { btn.style.transform = ""; lbl.style.transform = ""; };
        btn.addEventListener("mousemove", mm); btn.addEventListener("mouseleave", ml);
      });

      // subtle tilt
      document.querySelectorAll<HTMLElement>(".tilt").forEach((card) => {
        const mm = (e: MouseEvent) => {
          const r = card.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width - 0.5, py = (e.clientY - r.top) / r.height - 0.5;
          card.style.transform = `rotateY(${px * 5}deg) rotateX(${-py * 5}deg) translateY(-4px)`;
        };
        const ml = () => { card.style.transform = ""; };
        card.addEventListener("mousemove", mm); card.addEventListener("mouseleave", ml);
      });
    }

    return () => cleanups.forEach((c) => c());
  }, []);

  return (
    <>
      <div className="cursor" />
      <div className="cursor-dot" />
      <div id="progress" />
    </>
  );
}
