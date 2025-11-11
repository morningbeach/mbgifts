// app/(catalog)/gift-sets/page.tsx
export const runtime = 'edge';

type Set = { id: string; name: string; image?: string; price_cents?: number; items_count?: number; };

async function getData(): Promise<Set[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL ?? ''}/api/catalog?type=sets`, { cache: 'no-store' });
  return res.json();
}

export default async function GiftSets() {
  const items = await getData();

  return (
    <section className="mbg-container pad-y">
      <h1 className="section-title">Gift Sets</h1>
      <p className="muted">Ready-made bundles—customizable on demand.</p>

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
    </section>
  );
}
