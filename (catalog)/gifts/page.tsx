import FilterBar from '../components/FilterBar';
import Subnav from '../components/Subnav';

export const runtime = 'edge';

type Gift = {
  id: string; name: string; price_cents: number; image?: string; tags?: string;
};

async function getData(search: string): Promise<Gift[]> {
  const url = `/api/catalog?type=gifts${search ? '&' + search.replace(/^\?/, '') : ''}`;
  const res = await fetch(url, { cache: 'no-store' });
  return res.json();
}

export default async function GiftsPage({ searchParams }: { searchParams?: Record<string, string> }) {
  const q = new URLSearchParams(searchParams as any).toString();
  const items = await getData(q);

  return (
    <section className="mbg-container pad-y">
      <h1 className="section-title">Gifts</h1>
      <p className="muted">Curated objects for any theme or budget.</p>

      <FilterBar category="gifts" />
      <Subnav items={[
        { label: 'Coffee & Tea', href: '?theme=tea' },
        { label: 'Wellness', href: '?theme=wellness' },
        { label: 'Stationery', href: '?theme=stationery' },
        { label: 'Tech', href: '?theme=tech' },
      ]} />

      <div className="cards-3" style={{ marginTop: 16 }}>
        {items.map((g) => (
          <article key={g.id} className="card">
            <div className="card-media gradient-ocean" style={{ backgroundImage: g.image ? `url(${g.image})` : undefined, backgroundSize: 'cover' }} />
            <div className="card-body">
              <h3>{g.name}</h3>
              <p className="muted">{g.tags}</p>
              <div style={{ fontWeight: 700 }}>${(g.price_cents / 100).toFixed(2)}</div>
            </div>
          </article>
        ))}
      </div>

      <div className="cta-panel" style={{ marginTop: 24 }}>
        <h3>Can’t find the perfect mix?</h3>
        <p>Tell us your theme and budget—we’ll curate options in 24–48h.</p>
        <a className="btn btn-primary" href="/rfq?category=gifts">Start a Quote</a>
      </div>
    </section>
  );
}
