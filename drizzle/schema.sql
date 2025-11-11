CREATE TABLE IF NOT EXISTS rfqs (
  id TEXT PRIMARY KEY,
  company TEXT NOT NULL,
  email TEXT NOT NULL,
  region TEXT,
  quantity INTEGER NOT NULL,
  unit_budget REAL,
  deadline TEXT,
  theme TEXT,
  dietary TEXT,
  packaging_style TEXT,
  finishes TEXT,
  notes TEXT,
  summary_json TEXT,
  created_at TEXT DEFAULT ''
);
