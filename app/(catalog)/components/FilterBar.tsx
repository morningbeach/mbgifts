// @ts-nocheck

export default function FilterBar({ category }: { category: 'gifts' | 'sets' | 'boxes' }) {
  const base = category === 'gifts' ? '/gifts'
    : category === 'sets' ? '/gift-sets'
    : '/custom-packaging';

  const priceLinks =
    category === 'boxes'
      ? [
          { label: 'Base <$5', href: `${base}?price=0-500` },
          { label: '$5–$10', href: `${base}?price=500-1000` },
          { label: '$10–$20', href: `${base}?price=1000-2000` },
          { label: '$20+', href: `${base}?price=2000-` },
        ]
      : [
          { label: 'Under $20', href: `${base}?price=0-2000` },
          { label: '$20–$50', href: `${base}?price=2000-5000` },
          { label: '$50–$100', href: `${base}?price=5000-10000` },
          { label: '$100+', href: `${base}?price=10000-` },
        ];

  const themeLinks =
    category === 'gifts'
      ? [
          { label: 'Coffee & Tea', href: `${base}?theme=tea` },
          { label: 'Wellness', href: `${base}?theme=wellness` },
          { label: 'Stationery', href: `${base}?theme=stationery` },
          { label: 'Tech', href: `${base}?theme=tech` },
        ]
      : category === 'sets'
      ? [
          { label: 'Welcome', href: `${base}?theme=welcome` },
          { label: 'Holiday', href: `${base}?theme=holiday` },
          { label: 'VIP', href: `${base}?theme=vip` },
          { label: 'Conference', href: `${base}?theme=conference` },
        ]
      : [
          { label: 'Rigid', href: `${base}?theme=rigid` },
          { label: 'Mailer', href: `${base}?theme=mailer` },
          { label: 'Foldable', href: `${base}?theme=foldable` },
          { label: 'Eco', href: `${base}?theme=eco` },
        ];

  const dietLinks =
    category === 'boxes'
      ? [] // 包裝不需要飲食篩選
      : [
          { label: 'Vegan', href: `${base}?diet=vegan` },
          { label: 'Gluten-free', href: `${base}?diet=gluten_free` },
          { label: 'Nut-free', href: `${base}?diet=nut_free` },
          { label: 'Halal', href: `${base}?diet=halal` },
        ];

  return (
    <div className="filterbar">
      <div className="filter-group">
        <div className="filter-title">Price</div>
        <div className="filter-chips">
          {priceLinks.map((l) => (
            <a key={l.href} className="chip" href={l.href}>
              {l.label}
            </a>
          ))}
        </div>
      </div>

      <div className="filter-group">
        <div className="filter-title">Theme</div>
        <div className="filter-chips">
          {themeLinks.map((l) => (
            <a key={l.href} className="chip" href={l.href}>
              {l.label}
            </a>
          ))}
        </div>
      </div>

      {dietLinks.length > 0 && (
        <div className="filter-group">
          <div className="filter-title">Dietary</div>
          <div className="filter-chips">
            {dietLinks.map((l) => (
              <a key={l.href} className="chip" href={l.href}>
                {l.label}
              </a>
            ))}
          </div>
        </div>
      )}

      <style jsx>{`
        .filterbar {
          display: grid;
          grid-template-columns: 1fr;
          gap: 12px;
          margin: 16px 0 8px;
          border: 1px solid var(--border, #e5e7eb);
          border-radius: 12px;
          padding: 12px;
          background: var(--panel, #fff);
        }
        @media (min-width: 900px) {
          .filterbar {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        .filter-group {
          display: grid;
          gap: 8px;
        }
        .filter-title {
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--muted, #6b7280);
        }
        .filter-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        .chip {
          display: inline-block;
          padding: 6px 10px;
          border-radius: 999px;
          border: 1px solid var(--border, #e5e7eb);
          background: #fff;
          font-size: 13px;
          line-height: 1;
        }
        .chip:hover {
          border-color: #111827;
        }
      `}</style>
    </div>
  );
}
