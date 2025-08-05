const express = require('express');
const connectToDatabase = require('./config/database');
const { setRoutes } = require('./routes/index');
const path = require('path');


const app = express();
const PORT = process.env.PORT || 3001;
//add 
const cors = require('cors');
app.use(cors());


app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/home.html'));
  });

  
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
    