import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";
import { join } from "path";

export let db: Database<sqlite3.Database, sqlite3.Statement>;

export async function initDB() {
  db = await open({
    filename: join(__dirname, "../data/database.sqlite"),
    driver: sqlite3.Database,
  });
  // crea tabla si no existe
  await db.run(`
    CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    price REAL NOT NULL,
    quantity INTEGER NOT NULL,
    stock INTEGER NOT NULL DEFAULT 0
    )
  `);
}
