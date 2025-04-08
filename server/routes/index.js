const express = require('express');
const router = express.Router();

const authRoutes = require('./auth');
const userRoutes = require('./users');
const verifyToken = require('../middleware/auth.middleware');


router.use('/auth', authRoutes);
router.use('/users', verifyToken, userRoutes);


module.exports = router;
