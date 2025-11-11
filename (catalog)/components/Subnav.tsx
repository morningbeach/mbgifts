/**
 * 子選單佔位元件：先以靜態鏈結預留空間
 * 未來可從 D1 讀取子分類，或依 tags 熱門值產生 chips。
 */
export default function Subnav({ items }: { items: { label: string; href: string }[] }) {
  return (
    <nav className="subnav">
      {items.map(x => (
        <a key={x.href} href={x.href} className="chip">{x.label}</a>
      ))}
    </nav>
  );
}
