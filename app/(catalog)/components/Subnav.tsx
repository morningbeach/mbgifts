export default function Subnav({ items }: { items: { label: string; href: string }[] }) {
  return (
    <nav className="subnav">
      {items.map(x => (
        <a key={x.href} href={x.href} className="chip">{x.label}</a>
      ))}
    </nav>
  );
}
