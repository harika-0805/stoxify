const { connectToDatabase } = require('../config/database');

class IndexController {
    constructor() {
        this.initDB();
    }

    async initDB() {
        this.db = await connectToDatabase();
        console.log('Connected to MySQL database!');
    }

    // Fetch all stock data
    async getStockData(req, res) {
        try {
            const [rows] = await this.db.query('SELECT * FROM stockdata');
            res.json(rows);
        } catch (err) {
            console.error('Error fetching stock data:', err);
            res.status(500).json({ error: 'Error fetching stock data' });
        }
    }

    // Create a new stock entry
    async createStockData(req, res) {
        const { name, price } = req.body;
        try {
            const [result] = await this.db.query('INSERT INTO stockdata (name, price) VALUES (?, ?)', [name, price]);
            res.status(201).json({ id: result.insertId, name, price });
        } catch (err) {
            console.error('Error creating stock data:', err);
            res.status(500).json({ error: 'Error creating stock data' });
        }
    }

    // Fetch all transactions
    async getTransactions(req, res) {
        try {
            const [rows] = await this.db.query('SELECT * FROM transactions');
            res.json(rows);
        } catch (err) {
            console.error('Error fetching transactions:', err);
            res.status(500).json({ error: 'Error fetching transactions' });
        }
    }

    // Fetch all users
    async getUsers(req, res) {
        try {
            const [rows] = await this.db.query('SELECT * FROM user');
            res.json(rows);
        } catch (err) {
            console.error('Error fetching users:', err);
            res.status(500).json({ error: 'Error fetching users' });
        }
    }
}

module.exports = IndexController;

