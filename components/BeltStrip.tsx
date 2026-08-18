import { useTranslations } from "next-intl";
export default function BeltStrip() {
  const t = useTranslations("Belt");
  const items = t.raw("items") as string[];
  return (
    <div className="belt" aria-hidden="true">
      <div className="belt-track">
        {[...items, ...items].map((x, i) => (
          <span className="belt-item" key={i}><span className="sq" />{x}</span>
        ))}
      </div>
    </div>
  );
}
