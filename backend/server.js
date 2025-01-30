const express = require('express');
const { Pool } = require('pg');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const app = express();
const port = 3000;
const cors = require('cors');

// middleware
app.use(express.json());
app.use(cors());
// подключение к базе данных
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

// генерация JWT токена
function generateToken(userId) {
    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
}
// middleware для проверки JWT токена
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.sendStatus(401);
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}


// регистрация пользователя
app.post('/register', async (req, res) => {
    const { email, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    try {
        await pool.query('INSERT INTO users (email, password_hash) VALUES ($1, $2)', [email, passwordHash]);
        res.json({ success: true });
    } catch (err) {
        res.status(400).json({ error: 'User already exists' });
    }
});

// вход пользователя
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (result.rows.length === 0) {
        return res.status(400).json({ error: 'Invalid credentials' });
    }
    const user = result.rows[0];
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
        return res.status(400).json({ error: 'Invalid credentials' });
    }
    const token = generateToken(user.id);
    res.json({ token });
});

// создание вишлиста
app.post('/wishlists', authenticateToken, async (req, res) => {
    const { title } = req.body;
    const userId = req.user.userId;
    const result = await pool.query('INSERT INTO wishlists (user_id, title) VALUES ($1, $2) RETURNING *', [userId, title]);
    res.json(result.rows[0]);
});

// получение всех вишлистов
app.get('/wishlists', async (req, res) => {
    const result = await pool.query('SELECT * FROM wishlists');
    res.json(result.rows);
});

// получение деталей вишлиста
app.get('/wishlist/:id', async (req, res) => {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM gifts WHERE wishlist_id = $1', [id]);
    res.json(result.rows);
});



// добавление подарка
app.post('/wishlist/:id/add-gift', authenticateToken, async (req, res) => {
    const { id } = req.params;
    const { name, link } = req.body;
    const result = await pool.query('INSERT INTO gifts (wishlist_id, name, link) VALUES ($1, $2, $3) RETURNING *', [id, name, link]);
    res.json(result.rows[0]);
});

// резервирование подарка
app.post('/wishlist/:id/reserve-gift', authenticateToken, async (req, res) => {
    const { id } = req.params;
    const { giftId } = req.body;
    await pool.query('UPDATE gifts SET is_reserved = TRUE WHERE id = $1', [giftId]);
    res.json({ success: true });
});

// Проверка, является ли текущий пользователь владельцем вишлиста
app.get('/wishlist/is-owner/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;
    const userId = req.user.userId;

    try {
        const result = await pool.query('SELECT user_id FROM wishlists WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Wishlist not found' });
        }
        const wishlistOwnerId = result.rows[0].user_id;
        console.log(userId);
        console.log(wishlistOwnerId);
        res.json({ is_owner: wishlistOwnerId === userId });
    } catch (err) {
        console.error('Error checking if user is the owner:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// запуск сервера
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});