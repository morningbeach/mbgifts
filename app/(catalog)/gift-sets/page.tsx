import FilterBar from '../components/FilterBar';
import Subnav from '../components/Subnav';

export const runtime = 'edge';

type Set = { id: string; name: string; image?: string; price_cents?: number; items_count?: number; };

async function getData(search: string): Promise<Set[]> {
  const url = `/api/catalog?type=sets${search ? '&' + search.replace(/^\?/, '') : ''}`;
  const res = await fetch(url, { cache: 'no-store' });
  return res.json();
}

export default async function SetsPage({ searchParams }: { searchParams?: Record<string, string> }) {
  const q = new URLSearchParams(searchParams as any).toString();
  const items = await getData(q);

  return (
    <section className="mbg-container pad-y">
      <h1 className="section-title">Gift Sets</h1>
      <p className="muted">Ready-made bundles—customizable on demand.</p>

      <FilterBar category="sets" />
      <Subnav items={[
        { label: 'Welcome Kit', href: '?theme=welcome' },
        { label: 'Holiday', href: '?theme=holiday' },
        { label: 'VIP', href: '?theme=vip' },
        { label: 'Conference', href: '?theme=conference' },
      ]} />

      <div className="cards-3" style={{ marginTop: 16 }}>
        {items.map((s) => (
          <article key={s.id} className="card">
            <div className="card-media gradient-dawn" style={{ backgroundImage: s.image ? `url(${s.image})` : undefined, backgroundSize: 'cover' }} />
            <div className="card-body">
              <h3>{s.name}</h3>
              <p className="muted">{s.items_count ?? 0} items</p>
              {typeof s.price_cents === 'number' && (
                <div style={{ fontWeight: 700 }}>${(s.price_cents / 100).toFixed(2)}</div>
              )}
            </div>
          </article>
        ))}
      </div>

      <div className="cta-panel" style={{ marginTop: 24 }}>
        <h3>Need a themed set?</h3>
        <p>We’ll tailor a set to your event or audience.</p>
        <a className="btn btn-primary" href="/rfq?category=sets">Start a Quote</a>
      </div>
    </section>
  );
}
