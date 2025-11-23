DROP TABLE IF EXISTS redemptions;
CREATE TABLE IF NOT EXISTS redemptions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  memberId INTEGER NOT NULL,
  phoneNo TEXT NOT NULL,
  rewardId INTEGER NOT NULL,
  status INTEGER NOT NULL DEFAULT 0, -- maps to RedemptionStatus enum
  redeemedAt TEXT DEFAULT '',
  createdAt TEXT NOT NULL DEFAULT (datetime('now'))
);
