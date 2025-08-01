class IndexController {
    constructor(db) {
        this.db = db;
    }

    // Users
    getAllUsers = async (req, res) => {
        try {
            const [rows] = await this.db.query('SELECT * FROM user');
            res.json(rows);
        } catch (err) {
            console.error('Error fetching users:', err);
            res.status(500).json({ error: 'Error fetching users' });
        }
    };

    getUserById = async (req, res) => {
        const { id } = req.params;
        try {
            const [rows] = await this.db.query('SELECT * FROM user WHERE id = ?', [id]);
            if (rows.length === 0) return res.status(404).json({ error: 'User not found' });
            res.json(rows[0]);
        } catch (err) {
            console.error('Error fetching user:', err);
            res.status(500).json({ error: 'Error fetching user' });
        }
    };

    createUser = async (req, res) => {
        const { name, email } = req.body;
        try {
            const [result] = await this.db.query('INSERT INTO user (name, email) VALUES (?, ?)', [name, email]);
            res.status(201).json({ id: result.insertId, name, email });
        } catch (err) {
            console.error('Error creating user:', err);
            res.status(500).json({ error: 'Error creating user' });
        }
    };

    updateUser = async (req, res) => {
        const { id } = req.params;
        const { name, email } = req.body;
        try {
            const [result] = await this.db.query('UPDATE user SET name = ?, email = ? WHERE id = ?', [name, email, id]);
            if (result.affectedRows === 0) return res.status(404).json({ error: 'User not found' });
            res.json({ id, name, email });
        } catch (err) {
            console.error('Error updating user:', err);
            res.status(500).json({ error: 'Error updating user' });
        }
    };

    deleteUser = async (req, res) => {
        const { id } = req.params;
        try {
            const [result] = await this.db.query('DELETE FROM user WHERE id = ?', [id]);
            if (result.affectedRows === 0) return res.status(404).json({ error: 'User not found' });
            res.json({ message: 'User deleted successfully' });
        } catch (err) {
            console.error('Error deleting user:', err);
            res.status(500).json({ error: 'Error deleting user' });
        }
    };

    // Stocks
    getAllStocks = async (req, res) => {
        try {
            const [rows] = await this.db.query('SELECT * FROM stockdata');
            res.json(rows);
        } catch (err) {
            console.error('Error fetching stocks:', err);
            res.status(500).json({ error: 'Error fetching stocks' });
        }
    };

    getStockById = async (req, res) => {
        const { id } = req.params;
        try {
            const [rows] = await this.db.query('SELECT * FROM stockdata WHERE id = ?', [id]);
            if (rows.length === 0) return res.status(404).json({ error: 'Stock not found' });
            res.json(rows[0]);
        } catch (err) {
            console.error('Error fetching stock:', err);
            res.status(500).json({ error: 'Error fetching stock' });
        }
    };

    createStock = async (req, res) => {
        const { name, price } = req.body;
        try {
            const [result] = await this.db.query('INSERT INTO stockdata (name, price) VALUES (?, ?)', [name, price]);
            res.status(201).json({ id: result.insertId, name, price });
        } catch (err) {
            console.error('Error creating stock:', err);
            res.status(500).json({ error: 'Error creating stock' });
        }
    };

    updateStock = async (req, res) => {
        const { id } = req.params;
        const { name, price } = req.body;
        try {
            const [result] = await this.db.query('UPDATE stockdata SET name = ?, price = ? WHERE id = ?', [name, price, id]);
            if (result.affectedRows === 0) return res.status(404).json({ error: 'Stock not found' });
            res.json({ id, name, price });
        } catch (err) {
            console.error('Error updating stock:', err);
            res.status(500).json({ error: 'Error updating stock' });
        }
    };

    deleteStock = async (req, res) => {
        const { id } = req.params;
        try {
            const [result] = await this.db.query('DELETE FROM stockdata WHERE id = ?', [id]);
            if (result.affectedRows === 0) return res.status(404).json({ error: 'Stock not found' });
            res.json({ message: 'Stock deleted successfully' });
        } catch (err) {
            console.error('Error deleting stock:', err);
            res.status(500).json({ error: 'Error deleting stock' });
        }
    };

    // Transactions
    getAllTransactions = async (req, res) => {
        try {
            const [rows] = await this.db.query('SELECT * FROM transactions');
            res.json(rows);
        } catch (err) {
            console.error('Error fetching transactions:', err);
            res.status(500).json({ error: 'Error fetching transactions' });
        }
    };

    getTransactionById = async (req, res) => {
        const { id } = req.params;
        try {
            const [rows] = await this.db.query('SELECT * FROM transactions WHERE id = ?', [id]);
            if (rows.length === 0) return res.status(404).json({ error: 'Transaction not found' });
            res.json(rows[0]);
        } catch (err) {
            console.error('Error fetching transaction:', err);
            res.status(500).json({ error: 'Error fetching transaction' });
        }
    };

    createTransaction = async (req, res) => {
        const { stock_id, user_id, quantity, price } = req.body;
        console.log('REQ BODY:', req.body); // to check what Postman is sending

        try {
            const [result] = await this.db.query(
                'INSERT INTO transactions (stock_id, user_id, quantity, price) VALUES (?, ?, ?, ?)',
                [stock_id, user_id, quantity, price]
            );
            res.status(201).json({ id: result.insertId, stock_id, user_id, quantity, price });
        } catch (err) {
            console.error('Error creating transaction:', err);
            res.status(500).json({ error: 'Error creating transaction' });
        }
    };

    updateTransaction = async (req, res) => {
        const { id } = req.params;
        const { stock_id, user_id, quantity, price } = req.body;
        try {
            const [result] = await this.db.query(
                'UPDATE transactions SET stock_id = ?, user_id = ?, quantity = ?, price = ? WHERE id = ?',
                [stock_id, user_id, quantity, price, id]
            );
            if (result.affectedRows === 0) return res.status(404).json({ error: 'Transaction not found' });
            res.json({ id, stock_id, user_id, quantity, price });
        } catch (err) {
            console.error('Error updating transaction:', err);
            res.status(500).json({ error: 'Error updating transaction' });
        }
    };

    deleteTransaction = async (req, res) => {
        const { id } = req.params;
        try {
            const [result] = await this.db.query('DELETE FROM transactions WHERE id = ?', [id]);
            if (result.affectedRows === 0) return res.status(404).json({ error: 'Transaction not found' });
            res.json({ message: 'Transaction deleted successfully' });
        } catch (err) {
            console.error('Error deleting transaction:', err);
            res.status(500).json({ error: 'Error deleting transaction' });
        }
    };
}

module.exports = IndexController;
