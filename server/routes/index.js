const express = require('express');
const router = express.Router();

const authRoutes = require('./auth');
const userRoutes = require('./users');
const cosmosRoutes = require('./cosmos');
const fileRoutes = require('./files');

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/cosmos', cosmosRoutes);
router.use('/files', fileRoutes);

module.exports = router;
