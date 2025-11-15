CREATE TABLE IF NOT EXISTS members (
  phoneNo VARCHAR(20) PRIMARY KEY,
  name TEXT,
  points INTEGER NOT NULL DEFAULT 0,
  createdAt TEXT NOT NULL DEFAULT (datetime('now')),
  updatedAt TEXT NOT NULL DEFAULT (datetime('now')),
  isDeleted INTEGER NOT NULL DEFAULT 0
);