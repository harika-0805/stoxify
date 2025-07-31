const {createConnection} = require('mysql2/promise');

const connectToDatabase = async () => {
    const connection = await createConnection({
        host: 'localhost',  
        user: 'root',
        password: 'n3u3da!',
        database: 'mybank' 
    }); 
return connection;
};      
module.exports = connectToDatabase;