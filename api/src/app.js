const express = require('express');
const connectToDatabase = require('./config/database');
const { setRoutes } = require('./routes/index');

const app = express();
const PORT = process.env.PORT || 3001;
//add cors

app.use(express.json());

connectToDatabase()
    .then((db) => {
        console.log('Connected to the database');
        setRoutes(app, db);

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error('Database connection failed:', err);
    });


    ///changessss yooo
    