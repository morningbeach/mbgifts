"use client";

import { useMemo, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

type PriceRange = "any" | "0-20" | "20-50" | "50-100" | "100+";
type Theme = "any" | "wellness" | "home" | "coffee" | "stationery";
type Diet = "any" | "vegan" | "gluten-free" | "halal";

export default function FilterBar() {
  const router = useRouter();
  const sp = useSearchParams();

  const [price, setPrice] = useState<PriceRange>(
    (sp.get("price") as PriceRange) || "any"
  );
  const [theme, setTheme] = useState<Theme>(
    (sp.get("theme") as Theme) || "any"
  );
  const [diet, setDiet] = useState<Diet>((sp.get("diet") as Diet) || "any");

  // 將狀態同步回 URL（前端路由），目前不觸發資料請求
  useEffect(() => {
    const q = new URLSearchParams();
    if (price !== "any") q.set("price", price);
    if (theme !== "any") q.set("theme", theme);
    if (diet !== "any") q.set("diet", diet);

    const query = q.toString();
    const next = query ? `?${query}` : "";
    // 只更新搜尋參數，不跳頁
    router.replace(`${next}`, { scroll: false });
  }, [price, theme, diet, router]);

  const commonSelect =
    "block w-full rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm shadow-sm focus:border-black focus:outline-none";

  return (
    <section className="sticky top-0 z-10 w-full border-b border-neutral-200 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 px-4 py-4 sm:grid-cols-3">
        <div>
          <label className="mb-1 block text-xs uppercase tracking-wide text-neutral-500">
            Price
          </label>
          <select
            className={commonSelect}
            value={price}
            onChange={(e) => setPrice(e.target.value as PriceRange)}
          >
            <option value="any">Any</option>
            <option value="0-20">$0–$20</option>
            <option value="20-50">$20–$50</option>
            <option value="50-100">$50–$100</option>
            <option value="100+">$100+</option>
          </select>
        </div>
        <div>
          <label className="mb-1 block text-xs uppercase tracking-wide text-neutral-500">
            Theme
          </label>
          <select
            className={commonSelect}
            value={theme}
            onChange={(e) => setTheme(e.target.value as Theme)}
          >
            <option value="any">Any</option>
            <option value="wellness">Wellness</option>
            <option value="home">Home</option>
            <option value="coffee">Coffee</option>
            <option value="stationery">Stationery</option>
          </select>
        </div>
        <div>
          <label className="mb-1 block text-xs uppercase tracking-wide text-neutral-500">
            Dietary
          </label>
          <select
            className={commonSelect}
            value={diet}
            onChange={(e) => setDiet(e.target.value as Diet)}
          >
            <option value="any">Any</option>
            <option value="vegan">Vegan</option>
            <option value="gluten-free">Gluten-free</option>
            <option value="halal">Halal</option>
          </select>
        </div>
      </div>
    </section>
  );
}
