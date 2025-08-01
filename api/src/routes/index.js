const IndexController = require('../controllers/index');

function setRoutes(app, db) {
    const controller = new IndexController(db);

    // Users
    app.get('/users', controller.getAllUsers);
    app.get('/users/:id', controller.getUserById);
    app.post('/users', controller.createUser);
    app.put('/users/:id', controller.updateUser);
    app.delete('/users/:id', controller.deleteUser);

    // Stocks
    app.get('/stocks', controller.getAllStocks);
    app.get('/stocks/:id', controller.getStockById);
    app.post('/stocks', controller.createStock);
    app.put('/stocks/:id', controller.updateStock);
    app.delete('/stocks/:id', controller.deleteStock);

    // Transactions
    app.get('/transactions', controller.getAllTransactions);
    app.get('/transactions/:id', controller.getTransactionById);
    app.post('/transactions', controller.createTransaction);
    app.put('/transactions/:id', controller.updateTransaction);
    app.delete('/transactions/:id', controller.deleteTransaction);

    // Default route
    app.get('/', (req, res) => {
        res.send('Hello Hare!!!!!!!!');
    });
}

module.exports = { setRoutes };
