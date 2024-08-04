const sqlite3 = require('sqlite3');
const { open } = require('sqlite');
const path = require('path');

const dbPath = path.join(__dirname, 'mydatabase.db');

const initializeDB = async () => {
  const db = await open({
    filename: dbPath,
    driver: sqlite3.Database
  });

  await db.exec(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
  )`);

  await db.exec(`CREATE TABLE IF NOT EXISTS events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    date TEXT NOT NULL,
    location TEXT NOT NULL,
    description TEXT,
    userId INTEGER
  )`);

  await db.exec(`CREATE TABLE IF NOT EXISTS sessions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INTEGER,
    loginTime TEXT,
    logoutTime TEXT,
    ipAddress TEXT
  )`);

  return db;
};

module.exports = initializeDB;