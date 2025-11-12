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

type GiftSet = {
  id: string;
  name: string;
  image?: string;
  price_cents?: number;
  items_count?: number;
};

export default async function SetsPage({ searchParams }: { searchParams?: SP }) {
  const q = await toQueryString(searchParams);
  const url = `/api/catalog?type=sets${q ? `&${q}` : ''}`;
  const items: GiftSet[] = await (await fetch(url, { cache: 'no-store' })).json();

  return (
    <section className="mbg-container pad-y">
      <h1 className="section-title">Gift Sets</h1>
      <p className="muted">Ready-made bundles—customizable on demand.</p>

      {/* 篩選列 */}
      <FilterBar category="sets" />

      {/* 子選單（占位，可改為動態 chips） */}
      <Subnav
        items={[
          { label: 'Welcome Kit', href: '?theme=welcome' },
          { label: 'Holiday', href: '?theme=holiday' },
          { label: 'VIP', href: '?theme=vip' },
          { label: 'Conference', href: '?theme=conference' },
        ]}
      />

      {/* 卡片列表 */}
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
              <p className="muted">{s.items_count ?? 0} items</p>
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

      {/* CTA 區塊 */}
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
