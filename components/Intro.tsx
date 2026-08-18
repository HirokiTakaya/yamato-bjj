export default function Intro({ name }: { name: string }) {
  return (
    <div id="intro">
      <svg viewBox="0 0 120 120" aria-hidden="true">
        <circle className="ir" cx="60" cy="60" r="54" />
        <g className="id">
          <circle className="disc" cx="60" cy="60" r="58" />
          <circle className="ringw" cx="60" cy="60" r="50" />
          <circle className="sun" cx="84" cy="38" r="13" />
          <text className="sealt" x="58" y="68" textAnchor="middle" dominantBaseline="middle">柔</text>
        </g>
      </svg>
      <div className="iname">{name}</div>
    </div>
  );
}
