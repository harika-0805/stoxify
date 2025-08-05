
// src/controllers/index.js
exports.setRoutes = (app, db) => {
   app.get('/api/userdata', async (req, res) => {
    const { username } = req.query;

    try {
      const [rows] = await db.query(
      'SELECT id, username, email, password, total_balance, total_profit_loss, created_at FROM user WHERE username = ?',
      [username]
      );

      if (rows.length === 0) return res.status(404).json({ error: 'User not found' });

      res.json(rows[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
    });

    app.post('/api/userdata', async (req, res) => {
      const { username, email, password } = req.body;
    
      if (!username || !email || !password) {
        return res.status(400).json({ error: 'All fields are required.' });
      }
    
      try {
        // Check if username or email already exists
        const [existingUser] = await db.query(
          'SELECT id FROM user WHERE username = ? OR email = ?',
          [username, email]
        );
    
        if (existingUser.length > 0) {
          return res.status(409).json({ error: 'Username or email already exists.' });
        }
    
        const [result] = await db.query(
          'INSERT INTO user (username, password, email, total_balance, total_profit_loss, created_at) VALUES (?, ?, ?, ?, ?, NOW())',
          [username, password, email, 0.00, 0.00]
        );
    
        res.status(201).json({ message: 'User registered successfully', user_id: result.insertId });
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    });
    
  


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
   