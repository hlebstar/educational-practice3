const express = require('express');
const session = require('express-session');
const path = require('path');
const db = require('./database/db');
const bcrypt = require('bcrypt');

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: 'secret', resave: false, saveUninitialized: false }));

app.get('/', (req, res) => res.redirect('/register'));

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'register.html'));
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
            err => err ? res.json({ success: false, error: 'Логин занят' }) : res.json({ success: true }));
    } catch { res.json({ success: false, error: 'Ошибка' }); }
});

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));