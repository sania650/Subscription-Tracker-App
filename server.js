const express = require('express');
const mysql   = require('mysql2');
const cors    = require('cors');
const path    = require('path');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname)); // serves index.html from same folder

// ── DB config — change these to match your MySQL ──────────────
const db = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',       // your MySQL username
  password : 'root',           // your MySQL password
  database : 'subscription_tracker' // your database name
});

db.connect(err => {
  if (err) { console.error('MySQL connection failed:', err.message); process.exit(1); }
  console.log('MySQL connected');

  // Create table if it doesn't exist
  db.query(`
    CREATE TABLE IF NOT EXISTS subscriptions (
      id         INT AUTO_INCREMENT PRIMARY KEY,
      name       VARCHAR(100) NOT NULL,
      cost       DECIMAL(10,2) NOT NULL,
      day        INT NOT NULL,
      category   VARCHAR(50) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `, err => { if (err) console.error('Table create error:', err.message); });
});

// GET all subscriptions
app.get('/api/subscriptions', (req, res) => {
  db.query('SELECT * FROM subscriptions ORDER BY id', (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// POST add subscription
app.post('/api/subscriptions', (req, res) => {
  const { name, cost, day, category } = req.body;
  if (!name || cost == null || !day || !category)
    return res.status(400).json({ error: 'Missing fields' });

  db.query(
    'INSERT INTO subscriptions (name, cost, day, category) VALUES (?, ?, ?, ?)',
    [name, cost, day, category],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: result.insertId, name, cost, day, category });
    }
  );
});
// PUT update subscription
app.put('/api/subscriptions/:id', (req, res) => {
  const { name, cost, day, category } = req.body;
  db.query(
    'UPDATE subscriptions SET name=?, cost=?, day=?, category=? WHERE id=?',
    [name, cost, day, category, req.params.id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ success: true });
    }
  );
});

// DELETE subscription
app.delete('/api/subscriptions/:id', (req, res) => {
  db.query('DELETE FROM subscriptions WHERE id = ?', [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true });
  });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));