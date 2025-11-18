CREATE TABLE IF NOT EXISTS rewards (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  companyId INTEGER NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  points INTEGER NOT NULL DEFAULT 0,
  category INTEGER NOT NULL, -- maps to RewardCategory enum
  validFrom TEXT NULL,
  validUntil TEXT NULL,
  createdAt TEXT NOT NULL DEFAULT (datetime('now')),
  updatedAt TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (companyId) REFERENCES companies(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS rewards_companyId_idx ON rewards(companyId);
CREATE INDEX IF NOT EXISTS rewards_validFrom_idx ON rewards(validFrom);
