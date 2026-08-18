"use client";
import { useEffect, useRef, useState } from "react";

export default function Reveal({
  children, className = "reveal", as: Tag = "div", style,
}: { children: React.ReactNode; className?: string; as?: React.ElementType; style?: React.CSSProperties }) {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); io.disconnect(); } }, { threshold: 0.16 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <Tag ref={ref} className={`${className}${inView ? " in" : ""}`} style={style}>{children}</Tag>;
}
