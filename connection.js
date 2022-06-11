const mysql = require('mysql'); //requirataan mysql moduuli
const dotenv = require('dotenv');

dotenv.config({ path: './.env' });

const connection = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

module.exports = connection;