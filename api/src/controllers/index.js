
// src/controllers/index.js
exports.setRoutes = (app, db) => {
    app.get('/api/stocks', async (req, res) => {
      try {
        const [rows] = await db.query('SELECT * FROM stockdata');
        res.json(rows);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    });
  
    app.post('/api/buy', async (req, res) => {
      const { user_id, stock_id, qty } = req.body;
      try {
        const [stockRows] = await db.query('SELECT price FROM stockdata WHERE id = ?', [stock_id]);
        if (stockRows.length === 0) return res.status(404).json({ error: 'Stock not found' });
  
        const price = stockRows[0].price;
        const total_amount = price * qty;
  
        await db.query(
          'INSERT INTO transaction (user_id, stock_id, type, qty, price_per_stock, total_amount) VALUES (?, ?, "buy", ?, ?, ?)',
          [user_id, stock_id, qty, price, total_amount]
        );
  
        res.json({ message: 'Stock bought successfully' });
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    });
  
    app.post('/api/sell', async (req, res) => {
      const { user_id, stock_id, qty } = req.body;
      try {
        const [stockRows] = await db.query('SELECT price FROM stockdata WHERE id = ?', [stock_id]);
        if (stockRows.length === 0) return res.status(404).json({ error: 'Stock not found' });
  
        const price = stockRows[0].price;
        const total_amount = price * qty;
  
        await db.query(
          'INSERT INTO transaction (user_id, stock_id, type, qty, price_per_stock, total_amount) VALUES (?, ?, "sell", ?, ?, ?)',
          [user_id, stock_id, qty, price, total_amount]
        );
  
        res.json({ message: 'Stock sold successfully' });
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    });
  
    app.get('/api/transactions/:user_id', async (req, res) => {
      const { user_id } = req.params;
      try {
        const [rows] = await db.query('SELECT * FROM transaction WHERE user_id = ?', [user_id]);
        res.json(rows);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    });
  
    app.get('/api/watchlist/:user_id', async (req, res) => {
      const { user_id } = req.params;
      try {
        const [rows] = await db.query(
          'SELECT s.* FROM stockdata s JOIN watchlist w ON s.id = w.stock_id WHERE w.user_id = ?',
          [user_id]
        );
        res.json(rows);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    });
  
    app.post('/api/watchlist/add', async (req, res) => {
      const { user_id, stock_id } = req.body;
      console.log(user_id, stock_id, "lalalalalal");
      
      try {
        await db.query('INSERT INTO watchlist (user_id, stock_id) VALUES (?, ?)', [user_id, stock_id]);
        res.json({ message: 'Added to watchlist' });
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    });
  
    app.post('/api/watchlist/remove', async (req, res) => {
      const { user_id, stock_id } = req.body;
      try {
        await db.query('DELETE FROM watchlist WHERE user_id = ? AND stock_id = ?', [user_id, stock_id]);
        res.json({ message: 'Removed from watchlist' });
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    });
  };
  