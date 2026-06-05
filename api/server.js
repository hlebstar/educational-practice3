const express = require('express');
const session = require('express-session');
const path = require('path');
const bcrypt = require('bcrypt');
const db = require('../database/db');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: 'secret', resave: false, saveUninitialized: false }));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

app.post('/api/register', async (req, res) => {
    const { login, password, full_name, phone, email } = req.body;
    
    if (!login || !password || !full_name || !phone || !email) {
        return res.status(400).json({ error: 'Все поля обязательны' });
    }
    
    try {
        const hash = await bcrypt.hash(password, 10);
        db.run('INSERT INTO users (login, password, full_name, phone, email) VALUES (?,?,?,?,?)',
            [login, hash, full_name, phone, email],
            function(err) {
                if (err) {
                    return res.status(400).json({ error: 'Логин занят' });
                }
                res.json({ message: 'OK' });
            });
    } catch {
        res.status(500).json({ error: 'Ошибка сервера' });
    }
});

app.post('/api/login', (req, res) => {
    const { login, password } = req.body;
    
    console.log('Login attempt:', login);
    
    if (!login || !password) {
        return res.status(400).json({ error: 'Логин и пароль обязательны' });
    }
    
    db.get('SELECT * FROM users WHERE login = ?', [login], async (err, user) => {
        if (err) {
            console.error('DB error:', err);
            return res.status(500).json({ error: 'Ошибка сервера' });
        }
        
        if (!user) {
            console.log('User not found:', login);
            return res.status(401).json({ error: 'Неверный логин или пароль' });
        }
        
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
            console.log('Invalid password for:', login);
            return res.status(401).json({ error: 'Неверный логин или пароль' });
        }
        
        req.session.user = {
            id: user.id,
            login: user.login,
            full_name: user.full_name,
            role: user.role
        };
        
        console.log('Login success:', login);
        res.json({ user: req.session.user });
    });
});

app.get('/api/me', (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ error: 'Нет сессии' });
    }
    res.json(req.session.user);
});

app.post('/api/logout', (req, res) => {
    req.session.destroy();
    res.json({ message: 'OK' });
});

app.get('/api/orders', (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ error: 'Не авторизован' });
    }
    
    db.all('SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC', 
        [req.session.user.id], 
        (err, orders) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json(orders || []);
        });
});

app.post('/api/orders', (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ error: 'Не авторизован' });
    }
    
    const { address, phone, service, payment, date, time } = req.body;
    const user_id = req.session.user.id;
    
    db.run(`INSERT INTO orders (user_id, address, contact, service_type, payment_type, desired_date, desired_time)
            VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [user_id, address, phone, service, payment, date, time],
        function(err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({ id: this.lastID });
        });
});

app.get('/api/admin/orders', (req, res) => {
    if (!req.session.user || req.session.user.role !== 'admin') {
        return res.status(403).json({ error: 'Доступ запрещен' });
    }
    
    const sql = `
        SELECT orders.*, users.full_name as name, users.phone, users.email 
        FROM orders 
        JOIN users ON orders.user_id = users.id 
        ORDER BY orders.created_at DESC
    `;
    
    db.all(sql, [], (err, orders) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(orders || []);
    });
});

app.put('/api/admin/orders/:id', (req, res) => {
    if (!req.session.user || req.session.user.role !== 'admin') {
        return res.status(403).json({ error: 'Доступ запрещен' });
    }
    
    const { id } = req.params;
    const { status, reason } = req.body;
    
    if (status === 'canceled' && !reason) {
        return res.status(400).json({ error: 'Укажите причину отмены' });
    }
    
    const sql = status === 'canceled'
        ? 'UPDATE orders SET status = ?, cancel_reason = ? WHERE id = ?'
        : 'UPDATE orders SET status = ? WHERE id = ?';
    
    const params = status === 'canceled' ? [status, reason, id] : [status, id];
    
    db.run(sql, params, function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'OK' });
    });
});

app.listen(PORT, () => {
    console.log(`  сервер: http://localhost:${PORT}`);
});