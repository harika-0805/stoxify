const express = require('express');
const {connectToDatabase} = require('./config/database');
const cors =  require ('cors');
const setRoutes = require('./routes/index');

const app = express();
const PORT = process.env.PORT || 3000;
// 
// app.use(cors());


app.use(express.json());

connectToDatabase()
    .then(()=>{
        console.log('Connected to the database');
        // Set up routes
        setRoutes(app);
        
        // Start server
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });

    })
    .catch(err => {
        console.error('Database connection failed:', err);
    });

    
