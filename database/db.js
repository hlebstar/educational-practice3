const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'database.db');
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            login TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            full_name TEXT NOT NULL,
            phone TEXT NOT NULL,
            email TEXT NOT NULL,
            role TEXT DEFAULT 'user'
        )
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS orders (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            address TEXT NOT NULL,
            contact TEXT NOT NULL,
            service_type TEXT NOT NULL,
            payment_type TEXT NOT NULL,
            desired_date TEXT NOT NULL,
            desired_time TEXT NOT NULL,
            status TEXT DEFAULT 'новая',
            cancel_reason TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id)
        )
    `);

    const bcrypt = require('bcrypt');
    const adminPassword = bcrypt.hashSync('password', 10);
    
    db.run(
        `INSERT OR IGNORE INTO users (login, password, full_name, phone, email, role) 
         VALUES (?, ?, ?, ?, ?, ?)`,
        ['adminka', adminPassword, 'Администратор', '+70000000000', 'admin@clean.ru', 'admin']
    );
});

module.exports = db;