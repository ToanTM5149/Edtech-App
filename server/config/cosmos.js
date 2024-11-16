// config/cosmos.js
const { CosmosClient } = require('@azure/cosmos');
require('dotenv').config();

// Cho phép kết nối không an toàn nếu cần (ví dụ: môi trường phát triển)
if (process.env.ALLOW_INSECURE_CONNECTION === 'true') {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
}

// Tạo CosmosClient
const client = new CosmosClient({
    endpoint: process.env.COSMOS_ENDPOINT,
    key: process.env.COSMOS_KEY,
});

module.exports = client;
