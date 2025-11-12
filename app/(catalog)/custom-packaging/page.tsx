// @ts-nocheck
import FilterBar from '../components/FilterBar';
import Subnav from '../components/Subnav';


export const runtime = 'edge';
export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

type Box = { id: string; name: string; style: string; base_cost_cents: number; image?: string; finishes?: string };

export default async function BoxesPage() {
  // 最保險：先不吃 searchParams，等 API 完成再開
  const url = `/api/catalog?type=boxes`;
  const items: Box[] = await (await fetch(url, { cache: 'no-store' })).json();

  return (
    <section className="mbg-container pad-y">
      <h1 className="section-title">Gift Boxes</h1>
      <p className="muted">Rigid, foldable & mailer—luxury finishes tailored to your brand.</p>

      <FilterBar category="boxes" />
      <Subnav
        items={[
          { label: 'Rigid', href: '?theme=rigid' },
          { label: 'Mailer', href: '?theme=mailer' },
          { label: 'Foldable', href: '?theme=foldable' },
          { label: 'Eco options', href: '?theme=eco' },
        ]}
      />

      <div className="cards-3" style={{ marginTop: 16 }}>
        {items.map((b) => (
          <article key={b.id} className="card">
            <div
              className="card-media gradient-sand"
              style={{ backgroundImage: b.image ? `url(${b.image})` : undefined, backgroundSize: 'cover' }}
            />
            <div className="card-body">
              <h3>{b.name}</h3>
              <p className="muted">
                {b.style} {b.finishes ? `· ${b.finishes}` : ''}
              </p>
              <div style={{ fontWeight: 700 }}>Base ${(b.base_cost_cents / 100).toFixed(2)}</div>
            </div>
          </article>
        ))}
        {items.length === 0 && <div className="muted" style={{ padding: 16 }}>No results match your filters.</div>}
      </div>

      <div className="cta-panel" style={{ marginTop: 24 }}>
        <h3>Customize your packaging</h3>
        <p>Foil, emboss, spot UV, soft-touch—get a spec in 24–48h.</p>
        <a className="btn btn-primary" href="/rfq?category=boxes">Start a Quote</a>
      </div>
    </section>
  );
}
