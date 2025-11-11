// app/(catalog)/custom-packaging/page.tsx
export const runtime = 'edge';

type Box = { id: string; name: string; style: string; base_cost_cents: number; image?: string; finishes?: string; };

async function getData(): Promise<Box[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL ?? ''}/api/catalog?type=boxes`, { cache: 'no-store' });
  return res.json();
}

export default async function Boxes() {
  const items = await getData();

  return (
    <section className="mbg-container pad-y">
      <h1 className="section-title">Gift Boxes</h1>
      <p className="muted">Rigid, foldable & mailer—premium finishes to your brand.</p>

      <div className="cards-3" style={{ marginTop: 16 }}>
        {items.map((b) => (
          <article key={b.id} className="card">
            <div className="card-media gradient-sand" style={{ backgroundImage: b.image ? `url(${b.image})` : undefined, backgroundSize: 'cover' }} />
            <div className="card-body">
              <h3>{b.name}</h3>
              <p className="muted">{b.style} · {b.finishes}</p>
              <div style={{ fontWeight: 700 }}>Base ${(b.base_cost_cents / 100).toFixed(2)}</div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
