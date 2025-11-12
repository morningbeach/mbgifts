import FilterBar from '../components/FilterBar';
import Subnav from '../components/Subnav';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

/**
 * Next.js 15：searchParams 可能是 Promise
 * 定義型別，並將其轉成查詢字串
 */
type SP =
  | Promise<Record<string, string | string[]>>
  | Record<string, string | string[]>
  | undefined;

async function toQueryString(searchParams: SP) {
  const obj = (await searchParams) ?? {};
  const pairs: [string, string][] = [];
  Object.entries(obj).forEach(([k, v]) => {
    if (Array.isArray(v)) v.forEach((vv) => vv != null && pairs.push([k, String(vv)]));
    else if (v != null) pairs.push([k, String(v)]);
  });
  return new URLSearchParams(pairs).toString();
}

type Gift = {
  id: string;
  name: string;
  price_cents: number;
  image?: string;
  tags?: string;
};

export default async function GiftsPage({ searchParams }: { searchParams?: SP }) {
  const q = await toQueryString(searchParams);
  const url = `/api/catalog?type=gifts${q ? `&${q}` : ''}`;
  const items: Gift[] = await (await fetch(url, { cache: 'no-store' })).json();

  return (
    <section className="mbg-container pad-y">
      <h1 className="section-title">Gifts</h1>
      <p className="muted">Curated objects for any theme or budget.</p>

      {/* 篩選列（價格區間 / 主題 / 飲食） */}
      <FilterBar category="gifts" />

      {/* 子選單（占位，可改為動態 chips） */}
      <Subnav
        items={[
          { label: 'Coffee & Tea', href: '?theme=tea' },
          { label: 'Wellness', href: '?theme=wellness' },
          { label: 'Stationery', href: '?theme=stationery' },
          { label: 'Tech', href: '?theme=tech' },
        ]}
      />

      {/* 卡片列表 */}
      <div className="cards-3" style={{ marginTop: 16 }}>
        {items.map((g) => (
          <article key={g.id} className="card">
            <div
              className="card-media gradient-ocean"
              style={{
                backgroundImage: g.image ? `url(${g.image})` : undefined,
                backgroundSize: 'cover',
              }}
            />
            <div className="card-body">
              <h3>{g.name}</h3>
              <p className="muted">{g.tags}</p>
              <div style={{ fontWeight: 700 }}>${(g.price_cents / 100).toFixed(2)}</div>
            </div>
          </article>
        ))}
        {items.length === 0 && (
          <div className="muted" style={{ padding: 16 }}>
            No results match your filters.
          </div>
        )}
      </div>

      {/* CTA 區塊 */}
      <div className="cta-panel" style={{ marginTop: 24 }}>
        <h3>Can’t find the perfect mix?</h3>
        <p>Tell us your theme and budget—we’ll curate options in 24–48h.</p>
        <a className="btn btn-primary" href="/rfq?category=gifts">
          Start a Quote
        </a>
      </div>
    </section>
  );
}
