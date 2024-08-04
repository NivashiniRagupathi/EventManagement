const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const axios = require('axios');

const router = express.Router();
const SECRET_KEY = 'your_secret_key';

const authenticateJWT = (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
  if (token) {
    jwt.verify(token, SECRET_KEY, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  const db = req.db;

  if (!email || !password) {
    return res.status(400).send('Email and password are required');
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.run('INSERT INTO users (email, password) VALUES (?, ?)', [email, hashedPassword]);
    res.status(201).send('User registered successfully');
  } catch (err) {
    if (err.message.includes('UNIQUE constraint failed')) {
      res.status(400).send('User already exists');
    } else {
      res.status(500).send(err.message);
    }
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const db = req.db;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    const user = await db.get('SELECT * FROM users WHERE email = ?', [email]);
    if (user && await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '1h' });
      res.json({ token });
    } else {
      res.status(401).json({ error: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/events', authenticateJWT, async (req, res) => {
  const { name, date, location, description } = req.body;
  const userId = req.user.id;
  const db = req.db;

  if (!name || !date || !location) {
    return res.status(400).send('Name, date, and location are required');
  }

  try {
    await db.run('INSERT INTO events (name, date, location, description, userId) VALUES (?, ?, ?, ?, ?)', [name, date, location, description, userId]);
    res.status(201).send('Event created successfully');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get('/events', authenticateJWT, async (req, res) => {
  const userId = req.user.id;
  const db = req.db;

  try {
    const events = await db.all('SELECT * FROM events WHERE userId = ?', [userId]);
    res.json(events);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.put('/events/:id', authenticateJWT, async (req, res) => {
  const { id } = req.params;
  const { name, date, location, description } = req.body;
  const userId = req.user.id;
  const db = req.db;

  if (!name || !date || !location) {
    return res.status(400).send('Name, date, and location are required');
  }

  try {
    const event = await db.get('SELECT * FROM events WHERE id = ? AND userId = ?', [id, userId]);
    if (event) {
      await db.run('UPDATE events SET name = ?, date = ?, location = ?, description = ? WHERE id = ? AND userId = ?', [name, date, location, description, id, userId]);
      res.send('Event updated successfully');
    } else {
      res.status(404).send('Event not found');
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.delete('/events/:id', authenticateJWT, async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  const db = req.db;

  try {
    const event = await db.get('SELECT * FROM events WHERE id = ? AND userId = ?', [id, userId]);
    if (event) {
      await db.run('DELETE FROM events WHERE id = ? AND userId = ?', [id, userId]);
      res.send('Event deleted successfully');
    } else {
      res.status(404).send('Event not found');
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get('/weather/:location', async (req, res) => {
  const { location } = req.params;

  try {
    const response = await axios.get(`https://api.weatherapi.com/v1/current.json?key=YOUR_API_KEY&q=${location}`);
    res.json(response.data);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;