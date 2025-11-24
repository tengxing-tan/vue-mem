DROP TABLE IF EXISTS rewards;
CREATE TABLE IF NOT EXISTS rewards (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  companyId INTEGER DEFAULT 0,
  name TEXT NOT NULL,
  description TEXT,
  imageUrl TEXT,
  points INTEGER NOT NULL DEFAULT 0,
  category INTEGER NOT NULL DEFAULT 1, -- maps to RewardCategory enum
  validFrom TEXT NULL,
  validUntil TEXT NULL,
  createdAt TEXT NOT NULL DEFAULT (datetime('now')),
  updatedAt TEXT NOT NULL DEFAULT (datetime('now'))
);
