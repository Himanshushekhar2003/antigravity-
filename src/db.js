const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('test.db');

db.serialize(() => {
  // Orders Table
  db.run(`CREATE TABLE IF NOT EXISTS orders (
    id TEXT PRIMARY KEY,
    user_id TEXT,
    shop_id TEXT,
    rider_id TEXT,
    status TEXT,
    total_amount REAL,
    delivered_at TEXT,
    created_at TEXT
  )`);

  // Complaints Table
  db.run(`CREATE TABLE IF NOT EXISTS complaints (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id TEXT,
    user_id TEXT,
    type TEXT,
    description TEXT,
    status TEXT,
    refund_amount REAL,
    fraud_score REAL,
    created_at TEXT
  )`);
});

module.exports = db;
