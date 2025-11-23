DROP TABLE IF EXISTS members;
CREATE TABLE IF NOT EXISTS members (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  phoneNo VARCHAR(20) UNIQUE,
  name TEXT,
  points INTEGER NOT NULL DEFAULT 0,
  createdAt TEXT NOT NULL DEFAULT (datetime('now')),
  updatedAt TEXT NOT NULL DEFAULT (datetime('now')),
  isDeleted INTEGER NOT NULL DEFAULT 0
);

CREATE INDEX IF NOT EXISTS members_phoneNo_idx ON members(phoneNo);
