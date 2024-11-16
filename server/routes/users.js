const express = require('express');
const router = express.Router();
const { getAllUsers, createUser, deleteUser } = require('../controllers/users.controller');

router.get('/', getAllUsers);
router.post('/', createUser);
router.delete('/:user_id', deleteUser);

module.exports = router;
