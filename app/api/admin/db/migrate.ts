export async function onRequestPost({ env, request }) {
  const auth = request.headers.get("Authorization");
  if (auth !== "Bearer 35437316") {
    return new Response("Unauthorized", { status: 401 });
  }

  const db = env.DB;
  const results = [];

  const schema = [
    `CREATE TABLE IF NOT EXISTS gifts (
      id TEXT PRIMARY KEY,
      name TEXT,
      description TEXT,
      price REAL,
      image_url TEXT
    );`,
    `CREATE TABLE IF NOT EXISTS gift_sets (
      id TEXT PRIMARY KEY,
      name TEXT,
      description TEXT,
      price REAL,
      image_url TEXT
    );`,
    `CREATE TABLE IF NOT EXISTS gift_set_items (
      id TEXT PRIMARY KEY,
      set_id TEXT,
      gift_id TEXT,
      qty INTEGER,
      FOREIGN KEY(set_id) REFERENCES gift_sets(id),
      FOREIGN KEY(gift_id) REFERENCES gifts(id)
    );`
  ];

  for (const sql of schema) {
    const result = await db.exec(sql);
    results.push({ sql, result });
  }

  return Response.json({ ok: true, results });
}
