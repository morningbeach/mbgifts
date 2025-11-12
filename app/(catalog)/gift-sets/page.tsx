// @ts-nocheck
import FilterBar from '../components/FilterBar';
import Subnav from '../components/Subnav';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

type SetItem = {
  id: string;
  name: string;
  price_cents?: number;
  image?: string;
  items_count?: number;
};

export default async function SetsPage() {
  const url = `/api/catalog?type=sets`;
  let items: SetItem[] = [];
  try {
    const res = await fetch(url, { cache: 'no-store' });
    items = (await res.json()) as SetItem[];
  } catch (_) {
    items = [];
  }

  return (
    <section className="mbg-container pad-y">
      <h1 className="section-title">Gift Sets</h1>
      <p className="muted">Ready-made bundles—customizable on demand.</p>

      <FilterBar category="sets" />
      <Subnav
        items={[
          { label: 'Welcome', href: '?theme=welcome' },
          { label: 'Holiday', href: '?theme=holiday' },
          { label: 'VIP', href: '?theme=vip' },
          { label: 'Conference', href: '?theme=conference' },
        ]}
      />

      <div className="cards-3" style={{ marginTop: 16 }}>
        {items.map((s) => (
          <article key={s.id} className="card">
            <div
              className="card-media gradient-dawn"
              style={{
                backgroundImage: s.image ? `url(${s.image})` : undefined,
                backgroundSize: 'cover',
              }}
            />
            <div className="card-body">
              <h3>{s.name}</h3>
              <p className="muted">{typeof s.items_count === 'number' ? `${s.items_count} items` : ''}</p>
              {typeof s.price_cents === 'number' && (
                <div style={{ fontWeight: 700 }}>${(s.price_cents / 100).toFixed(2)}</div>
              )}
            </div>
          </article>
        ))}
        {items.length === 0 && (
          <div className="muted" style={{ padding: 16 }}>
            No results match your filters.
          </div>
        )}
      </div>

      <div className="cta-panel" style={{ marginTop: 24 }}>
        <h3>Need a themed set?</h3>
        <p>We’ll tailor a set to your event or audience.</p>
        <a className="btn btn-primary" href="/rfq?category=sets">
          Start a Quote
        </a>
      </div>
    </section>
  );
}
