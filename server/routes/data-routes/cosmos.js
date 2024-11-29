// routes/cosmos.js
const express = require('express');
const router = express.Router();
const { handleAddItem } = require('../controllers/cosmos.controller');

// Route để thêm dữ liệu vào Cosmos DB
router.post('/add', handleAddItem);

module.exports = router;
