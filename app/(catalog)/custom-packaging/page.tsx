// app/(catalog)/custom-packaging/page.tsx
import Subnav from "../components/Subnav";
import FilterBar from "../components/FilterBar";
import { boxes, money } from "@/lib/mock-data";

export const dynamic = "force-dynamic";
export const runtime = "edge";

export default function CustomPackagingPage() {
  const data = boxes;

  return (
    <main>
      <Subnav />
      <header className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="text-3xl font-semibold tracking-tight">Custom Packaging</h1>
        <p className="mt-2 text-neutral-600">
          Premium rigid, foldable and mailer boxes with foil, emboss, spot UV and more.
        </p>
      </header>

      <FilterBar />

      <section className="mx-auto max-w-6xl px-4 py-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data.map((b) => (
            <article
              key={b.id}
              className="group rounded-2xl border border-neutral-200 bg-white p-3 shadow-sm transition hover:shadow-md"
            >
              <div className="aspect-[4/3] w-full overflow-hidden rounded-xl bg-neutral-100">
                {b.image ? (
                  <img
                    src={b.image}
                    alt={b.name}
                    className="h-full w-full object-cover"
                  />
                ) : null}
              </div>
              <div className="p-3">
                <h3 className="text-base font-medium">{b.name}</h3>
                <p className="mt-1 text-sm text-neutral-600">
                  Style: {b.style.toUpperCase()}
                  {b.finishes ? ` · Finishes: ${b.finishes}` : ""}
                </p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-sm font-semibold">
                    From {money(b.base_cost_cents)}
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
            Tell us your specs
          </a>
        </div>
      </section>
    </main>
  );
}
