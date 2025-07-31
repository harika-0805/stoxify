// const app=require('express')();
// const fs = require('fs');

// app.get('/posts', (req, res) => {
//     fs.readFile('posts.json', 'utf8', (err, data) => {
//         if (err) {
//             res.status(500).send('Error reading posts.json');
//         } else {
//             res.setHeader('Content-Type', 'application/json');
//             res.send(data);
//         }
//     });
// });

// app.get('/posts/:id', (req, res) => {
//     const postId = req.params.id;
//     fs.readFile('posts.json', 'utf8', (err, data) => {
//         if (err) {
//             res.status(500).send('Error reading posts.json');
//         } else {
//             const posts = JSON.parse(data);
//             const post = posts.find(p => p.id === parseInt(postId));
//             if (post) {
//                 res.setHeader('Content-Type', 'application/json');
//                 res.send(post);
//             } else {
//                 res.status(404).send('Post not found');
//             }
//         }
//     });
// });
// // or const app = require('express'); and then const app = express();
// app.get('/', (req, res) => {
//   res.send('Hello Hare!!!!!!!!');
// });
// app.listen(9999, () => {
//   console.log('Server is running on port 9999');
// });


const express = require('express');
const mysql = require('mysql2');

const app = express();
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'n3u3da!', // replace with your MySQL root password
    database: 'express',
    port: 3306
});

db.connect((err) => {
    if (err) {
        console.error('DB connection failed:', err);
        return;
    }
    console.log('Connected to MySQL database.');
});

// GET all users
app.get('/users', (req, res) => {
    db.query('SELECT * FROM user', (err, results) => {
        if (err) {
            res.status(500).send('Error fetching users');
        } else {
            res.json(results);
        }
    });
});

// GET all stocks
app.get('/stocks', (req, res) => {
    db.query('SELECT * FROM stockdata', (err, results) => {
        if (err) {
            res.status(500).send('Error fetching stocks');
        } else {
            res.json(results);
        }
    });
});

// GET all transactions
app.get('/transactions', (req, res) => {
    db.query('SELECT * FROM transactions', (err, results) => {
        if (err) {
            res.status(500).send('Error fetching transactions');
        } else {
            res.json(results);
        }
    });
});

// or const app = require('express'); and then const app = express();
app.get('/', (req, res) => {
    res.send('Hello Hare!!!!!!!!');
  });

  

app.post('/insert_user', (req, res) => {
    const { name, email } = req.body;
    db.query('INSERT INTO user (username, email) VALUES (?, ?)', [name, email], (err, results) => {
        if (err) {
            res.status(500).send('Error inserting user');
        } else {
            res.status(201).json({ id: results.insertId, name, email });
        }
    });
});
app.post('/insert_stock', (req, res) => {
    const { stock_name, stock_price } = req.body;
    db.query('INSERT INTO stockdata (stock_name, stock_price) VALUES (?, ?)', [stock_name, stock_price], (err, results) => {
        if (err) {
            res.status(500).send('Error inserting stock');
        } else {
            res.status(201).json({ id: results.insertId, stock_name, stock_price });
        }
    });
});
app.post('/insert_transaction', (req, res) => {
    const { user_id, stock_id, quantity } = req.body;
    db.query('INSERT INTO transactions (user_id, stock_id, quantity) VALUES (?, ?, ?)', [user_id, stock_id, quantity], (err, results) => {
        if (err) {
            res.status(500).send('Error inserting transaction');
        } else {
            res.status(201).json({ id: results.insertId, user_id, stock_id, quantity });
        }
    });
});



// Start server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});


