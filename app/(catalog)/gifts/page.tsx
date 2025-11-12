import FilterBar from '../components/FilterBar';
import Subnav from '../components/Subnav';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store'

type Gift = {
  id: string; name: string; price_cents: number; image?: string; tags?: string;
};

async function getData(): Promise<Gift[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL ?? ''}/api/catalog?type=gifts`, { cache: 'no-store' });
  return res.json();
}

export default async function Gifts() {
  const items = await getData();

  return (
    <section className="mbg-container pad-y">
      <h1 className="section-title">Gifts</h1>
      <p className="muted">Curated objects for any theme or budget.</p>

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
    </section>
  );
}
