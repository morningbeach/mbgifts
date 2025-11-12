// app/(catalog)/gift-sets/page.tsx
import Subnav from "../components/Subnav";
import FilterBar from "../components/FilterBar";
import { giftSets, boxes, money } from "@/lib/mock-data";

export const dynamic = "force-dynamic";
export const runtime = "edge";

export default function GiftSetsPage() {
  const data = giftSets;

  return (
    <main>
      <Subnav />
      <header className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="text-3xl font-semibold tracking-tight">Gift Sets</h1>
        <p className="mt-2 text-neutral-600">
          Pre-curated bundles ready for onboarding, events and clients.
        </p>
      </header>

      <FilterBar />

      <section className="mx-auto max-w-6xl px-4 py-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data.map((s) => {
            const box = boxes.find((b) => b.id === s.box_id);
            return (
              <article
                key={s.id}
                className="group rounded-2xl border border-neutral-200 bg-white p-3 shadow-sm transition hover:shadow-md"
              >
                <div className="aspect-[4/3] w-full overflow-hidden rounded-xl bg-neutral-100">
                  {s.image ? (
                    <img
                      src={s.image}
                      alt={s.name}
                      className="h-full w-full object-cover"
                    />
                  ) : null}
                </div>
                <div className="p-3">
                  <h3 className="text-base font-medium">{s.name}</h3>
                  <p className="mt-1 text-sm text-neutral-600">
                    {box ? `Box: ${box.name}` : "\u00A0"}
                  </p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-sm font-semibold">
                      {money(s.price_cents)}
                    </span>
                    <a
                      href="/contact"
                      className="rounded-full border border-neutral-200 px-3 py-1.5 text-sm hover:bg-neutral-50"
                    >
                      Customize
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-10 flex justify-center">
          <a
            href="/contact"
            className="rounded-full bg-black px-4 py-2 text-sm text-white hover:bg-neutral-800"
          >
            Start your brief
          </a>
        </div>
      </section>
    </main>
  );
}
