const sql = require('mssql');
require('dotenv').config({ path: __dirname + '/../.env' });

const logger = require('../ultis/logger');

const config = {
  user: process.env.SQL_USER,
  password: process.env.SQL_PASSWORD,
  server: process.env.SQL_SERVER,
  database: process.env.SQL_DATABASE,
  port: parseInt(process.env.SQL_PORT) || 1433,
  options: {
    encrypt: false, // Sử dụng true nếu kết nối qua SSL
    trustServerCertificate: true // Cho phép nếu đang phát triển cục bộ
  }
};

const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then(pool => {
    logger.info('Connected to MSSQL');
    return pool;
  })
  .catch(err => {
    logger.error('SQL Server Connection Failed! Bad Config:', err);
    process.exit(1);
  });

module.exports = {
  sql,
  poolPromise
};
