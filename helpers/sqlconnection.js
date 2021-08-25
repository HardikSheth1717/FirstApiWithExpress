const mysql = require('mysql2');

module.exports = mysql.createPool({
    host: 'localhost',
    database: 'dbhrms',
    user: 'root',
    password: 'Semaphore@123',
    waitForConnections: true,
    queueLimit: 10
}).promise();