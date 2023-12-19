const mysql = require('mysql2');
const { ServerConfig } = require('./config');

const c = mysql.createConnection({
    host: 'database-1.cqvwnzwnpbvg.ap-south-1.rds.amazonaws.com',
    user: "admin",
    password: "12345yuiop",
    port:"3306",
    database:"doxx"

});


module.exports = {c}