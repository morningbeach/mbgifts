// app/(catalog)/components/Subnav.tsx
import Link from "next/link";

const items = [
  { href: "/gifts", label: "Gifts" },
  { href: "/gift-sets", label: "Gift Sets" },
  { href: "/custom-packaging", label: "Custom Packaging" },
];

export default function Subnav() {
  return (
    <nav className="w-full border-b border-neutral-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center gap-2 overflow-x-auto px-4 py-3">
        {items.map((it) => (
          <Link
            key={it.href}
            href={it.href}
            className="rounded-full border border-neutral-200 px-3 py-1.5 text-sm hover:bg-neutral-50"
          >
            {it.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
