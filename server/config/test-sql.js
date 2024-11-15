// test-sql.js
const sql = require('mssql');
require('dotenv').config();

const config = {
    user: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    server: process.env.SQL_SERVER,
    database: process.env.SQL_DATABASE,
    options: {
        encrypt: true, // Sử dụng nếu bạn kết nối qua SSL
        trustServerCertificate: true // Sử dụng trong môi trường phát triển
    }
};

async function testConnection() {
    try {
        let pool = await sql.connect(config);
        console.log("Connected to SQL Server successfully!");
        await pool.close();
    } catch (err) {
        console.error("Connection failed: ", err);
    }
}

testConnection();
