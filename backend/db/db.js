const mysql2 = require('mysql2/promise');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config();

const password = process.env.DB_PASSWORD;
const connectionLimit = process.env.connectionLimit ;
const host = process.env.host ;
const user = process.env.user ;
const port = parseInt(process.env.dbport) ;
const database = process.env.database;
// Load environment variables from .env file
// Create a connection to the database
// console.log('port', host)
const pool = mysql2.createPool({
    connectionLimit: connectionLimit,
    host: host,
    user: user,
    port: port,
    password: password,
    database: database
});

pool.getConnection()
  .then(() => console.log("Database connected successfully"))
  .catch(err => console.error("DB Connection Error:", err));

// Export the connection
module.exports = pool;