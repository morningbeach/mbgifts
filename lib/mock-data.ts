// lib/mock-data.ts
export type Gift = {
  id: string;
  sku?: string;
  name: string;
  price_cents: number;
  image?: string;
  tags?: string; // comma-separated
};

export type Box = {
  id: string;
  style: "rigid" | "foldable" | "mailer";
  name: string;
  base_cost_cents: number;
  finishes?: string; // comma-separated
  image?: string;
};

export type GiftSet = {
  id: string;
  name: string;
  box_id?: string;
  price_cents?: number;
  image?: string;
  items?: { gift_id: string; qty: number }[];
};

export const categories = [
  { id: "cat_boxes", slug: "boxes", name: "Gift Boxes" },
  { id: "cat_gifts", slug: "gifts", name: "Gifts" },
  { id: "cat_sets", slug: "sets", name: "Gift Sets" },
];

export const boxes: Box[] = [
  {
    id: "box1",
    style: "rigid",
    name: "Signature Rigid Box (M)",
    base_cost_cents: 450,
    image: "/images/box-rigid-m.jpg",
    finishes: "foil,emboss",
  },
  {
    id: "box2",
    style: "mailer",
    name: "Eco Mailer (L)",
    base_cost_cents: 250,
    image: "/images/box-mailer-l.jpg",
    finishes: "spot_uv",
  },
];

export const gifts: Gift[] = [
  {
    id: "g1",
    sku: "TEA-001",
    name: "Single-Origin Tea",
    price_cents: 1200,
    image: "/images/gifts/tea.jpg",
    tags: "tea,wellness",
  },
  {
    id: "g2",
    sku: "MUG-002",
    name: "Ceramic Mug",
    price_cents: 1800,
    image: "/images/gifts/mug.jpg",
    tags: "home,coffee",
  },
  {
    id: "g3",
    sku: "NOTE-003",
    name: "Linen Notebook",
    price_cents: 1500,
    image: "/images/gifts/notebook.jpg",
    tags: "stationery",
  },
];

export const giftSets: GiftSet[] = [
  {
    id: "s1",
    name: "Welcome Kit",
    box_id: "box1",
    price_cents: 5200,
    image: "/images/sets/welcome.jpg",
    items: [
      { gift_id: "g3", qty: 1 },
      { gift_id: "g1", qty: 1 },
    ],
  },
];

/** 小工具：把分轉成顯示用字串 */
export function money(cents?: number) {
  if (typeof cents !== "number") return "—";
  return `$${(cents / 100).toFixed(2)}`;
}
