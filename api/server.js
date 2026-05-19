const express = require('express');
const session = require('express-session');
const path = require('path');
const bcrypt = require('bcrypt');
const db = require('../database/db');
const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, '../public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: 'secret', resave: false, saveUninitialized: false }));
app.get('/', (req, res) => res.redirect('/register'));

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'register.html'));
});

app.post('/api/register', async (req, res) => {
    const { login, password, full_name, phone, email } = req.body;
    
    if (!login || !password || !full_name || !phone || !email) {
        return res.json({ success: false, error: 'Все поля обязательны' });
    }
    
    try {
        const hash = await bcrypt.hash(password, 10);
        db.run('INSERT INTO users (login, password, full_name, phone, email) VALUES (?,?,?,?,?)',
            [login, hash, full_name, phone, email],
            function(err) {
                if (err) {
                    return res.json({ success: false, error: 'Логин занят' });
                }
                res.json({ success: true });
            });
    } catch {
        res.json({ success: false, error: 'Ошибка сервера' });
    }
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'login.html'));
});

app.post('/api/login', (req, res) => {
    const { login, password } = req.body;
    
    db.get('SELECT * FROM users WHERE login = ?', [login], async (err, user) => {
        if (err || !user) {
            return res.json({ success: false, error: 'Неверный логин или пароль' });
        }
        
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
            return res.json({ success: false, error: 'Неверный логин или пароль' });
        }
        
        req.session.user = user;
        res.json({ success: true, role: user.role });
    });
});

app.get('/dashboard', (req, res) => {
    if (!req.session.user) return res.redirect('/login');
    res.sendFile(path.join(__dirname, '../public', 'dashboard.html'));
});


app.get('/new-order', (req, res) => {
    if (!req.session.user) return res.redirect('/login');
    res.sendFile(path.join(__dirname, '../public', 'new-order.html'));
});


app.post('/api/orders', (req, res) => {
    if (!req.session.user) return res.json({ success: false, error: 'Не авторизован' });
    
    const { address, contact, service_type, payment_type, desired_date, desired_time } = req.body;
    const user_id = req.session.user.id;
    
    db.run(`INSERT INTO orders (user_id, address, contact, service_type, payment_type, desired_date, desired_time)
            VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [user_id, address, contact, service_type, payment_type, desired_date, desired_time],
        function(err) {
            if (err) {
                return res.json({ success: false, error: 'Ошибка при создании заявки' });
            }
            res.json({ success: true, order_id: this.lastID });
        });
});

app.get('/api/my-orders', (req, res) => {
    if (!req.session.user) return res.json({ success: false, error: 'Не авторизован' });
    
    db.all('SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC', 
        [req.session.user.id], 
        (err, orders) => {
            if (err) return res.json({ success: false, error: 'Ошибка' });
            res.json({ success: true, orders });
        });
});

app.get('/admin', (req, res) => {
    if (!req.session.user || req.session.user.role !== 'admin') {
        return res.redirect('/login');
    }
    res.sendFile(path.join(__dirname, '../public', 'admin.html'));
});


app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/login');
});

app.listen(PORT, () => {
    console.log(` Сервер запущен: http://localhost:${PORT}`);
    console.log(` Регистрация: http://localhost:${PORT}/register`);
    console.log(` Вход: http://localhost:${PORT}/login`);
    console.log(` Админ: adminka / password`);
});