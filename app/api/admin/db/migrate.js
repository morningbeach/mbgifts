export async function onRequestPost({ env, request }) {
  // Authorization
  const auth = request.headers.get("authorization") || "";
  const token = auth.replace(/^Bearer\s+/i, "");
  const secret = env.ADMIN_TOKEN;
  if (!secret || token !== secret) {
    return new Response(JSON.stringify({ ok: false, error: "Unauthorized" }), {
      status: 401,
      headers: { "content-type": "application/json" },
    });
  }

  const db = env.DB;
  if (!db) {
    return new Response(JSON.stringify({ ok: false, error: "DB binding not found" }), {
      status: 500,
      headers: { "content-type": "application/json" },
    });
  }

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

  const results = [];
  for (const sql of SQL) {
    try {
      await db.prepare(sql).run();
      results.push({ sql, ok: true });
    } catch (e) {
      results.push({ sql, ok: false, error: String(e && e.message ? e.message : e) });
    }
  }

  return new Response(JSON.stringify({ ok: true, results }), {
    headers: { "content-type": "application/json" },
  });
}
