// app/(catalog)/components/FilterBar.tsx
"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";

type Props = {
  placeholders?: {
    theme?: string;
    diet?: string;
  };
};

export default function FilterBar({ placeholders }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const search = useSearchParams();

  const min = search.get("min") ?? "";
  const max = search.get("max") ?? "";
  const theme = search.get("theme") ?? "";
  const diet = search.get("diet") ?? "";

  const set = useCallback(
    (key: string, value: string) => {
      const next = new URLSearchParams(search.toString());
      if (!value) next.delete(key);
      else next.set(key, value);
      router.push(`${pathname}?${next.toString()}`, { scroll: false });
    },
    [router, pathname, search]
  );

  const onSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const fd = new FormData(e.currentTarget as HTMLFormElement);
      set("min", String(fd.get("min") ?? ""));
      set("max", String(fd.get("max") ?? ""));
      set("theme", String(fd.get("theme") ?? ""));
      set("diet", String(fd.get("diet") ?? ""));
    },
    [set]
  );

  const themeOptions = useMemo(
    () => ["All", "Wellness", "Home", "Stationery", "Coffee", "Tea"],
    []
  );
  const dietOptions = useMemo(() => ["All", "Vegan", "Gluten-free"], []);

  return (
    <form
      onSubmit={onSubmit}
      className="w-full border-b border-neutral-200 bg-white"
    >
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-3 px-4 py-4 sm:grid-cols-5">
        <div className="flex items-center gap-2">
          <label className="w-10 text-sm text-neutral-600">Min</label>
          <input
            name="min"
            defaultValue={min}
            inputMode="numeric"
            className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm"
            placeholder="0"
          />
        </div>
        <div className="flex items-center gap-2">
          <label className="w-10 text-sm text-neutral-600">Max</label>
          <input
            name="max"
            defaultValue={max}
            inputMode="numeric"
            className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm"
            placeholder="100"
          />
        </div>
        <div className="flex items-center gap-2">
          <label className="w-16 text-sm text-neutral-600">Theme</label>
          <select
            name="theme"
            defaultValue={theme}
            className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm"
          >
            {themeOptions.map((t) => (
              <option key={t} value={t === "All" ? "" : t.toLowerCase()}>
                {t}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-2">
          <label className="w-12 text-sm text-neutral-600">Diet</label>
          <select
            name="diet"
            defaultValue={diet}
            className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm"
          >
            {dietOptions.map((d) => (
              <option key={d} value={d === "All" ? "" : d.toLowerCase()}>
                {d}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="submit"
            className="w-full rounded-lg bg-black px-4 py-2 text-sm text-white hover:bg-neutral-800"
          >
            Apply
          </button>
        </div>
      </div>
      
    </form>
  );
}
