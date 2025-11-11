import { NextRequest, NextResponse } from "next/server";
export const runtime = "edge";

const SQL = [
  `PRAGMA foreign_keys = ON;`,

  `CREATE TABLE IF NOT EXISTS gifts (
    id TEXT PRIMARY KEY,
    sku TEXT UNIQUE,
    name TEXT NOT NULL,
    price_cents INTEGER NOT NULL,
    image_key TEXT,
    tags TEXT,
    created_at TEXT DEFAULT (datetime('now'))
  );`,

  `CREATE TABLE IF NOT EXISTS gift_sets (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    box_id TEXT,
    price_cents INTEGER,
    image_key TEXT,
    created_at TEXT DEFAULT (datetime('now'))
  );`,

  `CREATE TABLE IF NOT EXISTS gift_set_items (
    id TEXT PRIMARY KEY,
    set_id TEXT NOT NULL,
    gift_id TEXT NOT NULL,
    qty INTEGER NOT NULL DEFAULT 1
  );`,

  `INSERT OR IGNORE INTO gifts (id,sku,name,price_cents,image_key,tags)
   VALUES ('g1','TEA-001','Single-Origin Tea',1200,'gifts/tea.jpg','tea,wellness'),
          ('g3','NOTE-003','Linen Notebook',1500,'gifts/notebook.jpg','stationery');`,

  `INSERT OR IGNORE INTO gift_sets (id,name,price_cents,image_key)
   VALUES ('s1','Welcome Kit',5200,'sets/welcome.jpg');`,

  `INSERT OR IGNORE INTO gift_set_items (id,set_id,gift_id,qty)
   VALUES ('si1','s1','g3',1),('si2','s1','g1',1);`,
];

export async function POST(req: NextRequest) {
  const token = (req.headers.get("authorization") || "").replace(/^Bearer\s+/i, "");
  const secret = process.env.ADMIN_TOKEN || (globalThis as any).env?.ADMIN_TOKEN;
  if (!token || token !== secret) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  // @ts-expect-error Pages runtime injects env.DB
  const db: D1Database | undefined = (globalThis as any).env?.DB;
  if (!db) return NextResponse.json({ ok: false, error: "DB binding not found" }, { status: 500 });

  const result = [];
  for (const sql of SQL) {
    try {
      await db.prepare(sql).run();
      result.push({ sql, ok: true });
    } catch (err: any) {
      result.push({ sql, ok: false, error: err.message });
    }
  }
  return NextResponse.json({ ok: true, result });
}
