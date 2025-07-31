const {Router} = require('express');
const IndexController = require('../cotrollers');
const router = Router();
const IndexController = new IndexController();

function setRoutes(app) {

    app.use('/api/items', router);
    // GET all users
    app.get('/users', IndexController.getAllUsers);

    // GET all stocks
    app.get('/stocks', IndexController.getAllStocks);

    // GET all transactions
    app.get('/transactions', IndexController.getAllTransactions);

    // Home route
    app.get('/', (req, res) => {
        res.send('Hello Hare!!!!!!!!');
    });

    // Insert user
    app.post('/insert_user', IndexController.insertUser);

    // Insert stock
    app.post('/insert_stock', IndexController.insertStock);
}


modules.exports = {setRoutes};

