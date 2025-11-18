CREATE TABLE IF NOT EXISTS members (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  companyId INTEGER NOT NULL,
  phoneNo VARCHAR(20) UNIQUE,
  name TEXT NULL,
  points INTEGER NOT NULL DEFAULT 0,
  createdAt TEXT NOT NULL DEFAULT (datetime('now')),
  updatedAt TEXT NOT NULL DEFAULT (datetime('now')),
  isDeleted INTEGER NOT NULL DEFAULT 0,
  FOREIGN KEY (companyId) REFERENCES companies(id) ON DELETE CASCADE
);
  
CREATE INDEX IF NOT EXISTS members_companyId_idx ON members(companyId);
CREATE INDEX IF NOT EXISTS members_phoneNo_idx ON members(phoneNo);