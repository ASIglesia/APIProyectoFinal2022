const mysql = require('mysql2');
require('dotenv').config()
const util = require("util");
const databaseConnection = mysql.createPool({
    host:process.env.DB_HOST,
    database:process.env.DB_NAME,
    user:process.env.DB_USER,
});

databaseConnection.getConnection((err)=>{
    err
        ? console.warn("No conectado", { error: err.message })
        : console.log("Servidor conectado a MySQL")
});

databaseConnection.query = util.promisify(databaseConnection.query);
module.exports= databaseConnection