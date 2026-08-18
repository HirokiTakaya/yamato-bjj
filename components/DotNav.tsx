const ITEMS = [["about","Academy"],["training","Training"],["philosophy","Philosophy"],["schedule","Schedule"],["firstday","First Day"],["pricing","Pricing"],["instructor","Instructor"],["faq","FAQ"],["contact","Visit"]] as const;
export default function DotNav() {
  return (
    <nav className="dotnav" aria-hidden="true">
      {ITEMS.map(([id, label]) => <a key={id} href={`#${id}`} data-label={label} />)}
    </nav>
  );
}
