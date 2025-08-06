const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// ✅ STEP 1: Declare and connect DB here
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'n3u3da!', // use your MySQL password if any
  database: 'express1'
});

db.connect((err) => {
  if (err) {
    console.error('❌ MySQL connection error:', err);
    return;
  }
  console.log('✅ Connected to MySQL!');
});

// ✅ STEP 2: Your API routes AFTER db is defined
app.get('/api/stocks', (req, res) => {
  db.query('SELECT * FROM stockdata', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// ✅ STEP 3: Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
