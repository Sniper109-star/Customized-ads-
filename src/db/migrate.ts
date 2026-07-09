import Database from "better-sqlite3";

const sqlite = new Database("./sqlite.db");

export function ensureSchema() {
  const tables = [
    `CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT NOT NULL UNIQUE, password TEXT NOT NULL, name TEXT NOT NULL, created_at TEXT NOT NULL);`,
    `CREATE TABLE IF NOT EXISTS platforms (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, slug TEXT NOT NULL UNIQUE, icon TEXT, color TEXT);`,
    `CREATE TABLE IF NOT EXISTS ad_accounts (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER NOT NULL, platform_id INTEGER NOT NULL, name TEXT NOT NULL, account_id TEXT NOT NULL, access_token TEXT, refresh_token TEXT, expires_at TEXT, is_active INTEGER NOT NULL DEFAULT 1, created_at TEXT NOT NULL);`,
    `CREATE TABLE IF NOT EXISTS campaigns (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER NOT NULL, account_id INTEGER NOT NULL, name TEXT NOT NULL, objective TEXT NOT NULL, status TEXT NOT NULL DEFAULT 'draft', budget REAL, budget_type TEXT DEFAULT 'daily', start_date TEXT, end_date TEXT, created_at TEXT NOT NULL, updated_at TEXT NOT NULL);`,
    `CREATE TABLE IF NOT EXISTS ads (id INTEGER PRIMARY KEY AUTOINCREMENT, campaign_id INTEGER NOT NULL, user_id INTEGER NOT NULL, name TEXT NOT NULL, ad_type TEXT NOT NULL, status TEXT NOT NULL DEFAULT 'draft', headline TEXT, body TEXT, cta TEXT, image_url TEXT, video_url TEXT, destination_url TEXT, platform_ad_id TEXT, created_at TEXT NOT NULL, updated_at TEXT NOT NULL);`,
    `CREATE TABLE IF NOT EXISTS metrics (id INTEGER PRIMARY KEY AUTOINCREMENT, ad_id INTEGER NOT NULL, date TEXT NOT NULL, impressions INTEGER DEFAULT 0, clicks INTEGER DEFAULT 0, conversions INTEGER DEFAULT 0, spend REAL DEFAULT 0, ctr REAL DEFAULT 0, cpc REAL DEFAULT 0, cpm REAL DEFAULT 0);`,
  ];

  try {
    const stmt = sqlite.prepare(`SELECT count(1) AS c FROM sqlite_master WHERE type='table' AND name = ?`);
    for (const sql of tables) {
      const match = sql.match(/CREATE TABLE IF NOT EXISTS (\w+)/);
      const name = match?.[1];
      if (name) {
        const row = stmt.get(name) as { c: number };
        if (row?.c === 0) {
          console.log(`Creating table: ${name}`);
          sqlite.exec(sql);
        }
      }
    }
    console.log("Migration check complete");
  } catch (err) {
    console.error("Migration failed:", err);
    process.exit(1);
  } finally {
    sqlite.close();
  }
}
