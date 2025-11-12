// app/(catalog)/gifts/page.tsx
import Subnav from "../components/Subnav";
import FilterBar from "../components/FilterBar";
import { gifts, money } from "@/lib/mock-data";

export const dynamic = "force-dynamic";
export const runtime = "edge";

export default function GiftsPage() {
  // TODO: 未來可讀取 searchParams 來做真正篩選
  const data = gifts;

  return (
    <main>
      <Subnav />
      <header className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="text-3xl font-semibold tracking-tight">Gifts</h1>
        <p className="mt-2 text-neutral-600">
          Curated single items — tea, mugs, stationery and more.
        </p>
      </header>

      <FilterBar />

      <section className="mx-auto max-w-6xl px-4 py-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data.map((g) => (
            <article
              key={g.id}
              className="group rounded-2xl border border-neutral-200 bg-white p-3 shadow-sm transition hover:shadow-md"
            >
              <div className="aspect-[4/3] w-full overflow-hidden rounded-xl bg-neutral-100">
                {g.image ? (
                  // 可換成 next/image；為了在 Cloudflare Pages 上簡化，先用 <img>
                  <img
                    src={g.image}
                    alt={g.name}
                    className="h-full w-full object-cover"
                  />
                ) : null}
              </div>
              <div className="p-3">
                <h3 className="text-base font-medium">{g.name}</h3>
                <p className="mt-1 text-sm text-neutral-600">
                  {g.sku ? `SKU: ${g.sku}` : "\u00A0"}
                </p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-sm font-semibold">
                    {money(g.price_cents)}
                  </span>
                  <a
                    href="/contact"
                    className="rounded-full border border-neutral-200 px-3 py-1.5 text-sm hover:bg-neutral-50"
                  >
                    Enquire
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <a
            href="/contact"
            className="rounded-full bg-black px-4 py-2 text-sm text-white hover:bg-neutral-800"
          >
            Get a quote
          </a>
        </div>
      </section>
    </main>
  );
}
