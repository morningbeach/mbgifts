// @ts-nocheck

type Item = { label: string; href: string };

export default function Subnav({ items = [] as Item[] }) {
  return (
    <nav className="subnav">
      <div className="rail">
        {items.map((it) => (
          <a key={it.href} href={it.href} className="pill">
            {it.label}
          </a>
        ))}
      </div>

      <style jsx>{`
        .subnav {
          margin-top: 8px;
          overflow-x: auto;
        }
        .rail {
          display: flex;
          gap: 10px;
          padding: 4px 0 6px;
        }
        .pill {
          padding: 8px 12px;
          border-radius: 999px;
          background: #f3f4f6;
          border: 1px solid #e5e7eb;
          font-size: 13px;
          white-space: nowrap;
        }
        .pill:hover {
          background: #e5e7eb;
        }
      `}</style>
    </nav>
  );
}
