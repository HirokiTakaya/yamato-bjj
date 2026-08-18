/** ライン・マスク見出し（行ごとに下からせり上がる） */
export default function Heading({ lines, underline = true }: { lines: string[]; underline?: boolean }) {
  return (
    <h2 className="display">
      {lines.filter(Boolean).map((l, i) => (
        <span className="lm" key={i}>
          <span className="li" dangerouslySetInnerHTML={{ __html: l }} />
        </span>
      ))}
      {underline && <span className="ul" />}
    </h2>
  );
}
