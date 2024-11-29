const express = require('express');
const router = express.Router();
const { getAllUsers, createUser, deleteUser } = require('../controllers/users.controller');

router.get('/get_all', getAllUsers);
router.post('/create', createUser);
router.delete('/delete/:user_id', deleteUser);

module.exports = router;
