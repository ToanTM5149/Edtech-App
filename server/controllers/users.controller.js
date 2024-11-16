const { getAllUsersDb, createUserDb, deleteUserDb } = require('../db/users.db');

const getAllUsers = async (req, res) => {
  try {
    const users = await getAllUsersDb();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createUser = async (req, res) => {
  try {
    const { username, email, password, full_name } = req.body;
    console.log("Received request data:", req.body);

    if (!username || !email || !password) {
      return res.status(400).json({ error: 'Username, email, and password are required' });
    }

    const newUser = await createUserDb({ username, email, password, full_name });
    console.log("New user created:", newUser);
    
    if (!newUser) {
      return res.status(500).json({ error: 'Failed to create user' });
    }

    res.status(201).json(newUser);
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(500).json({ error: err.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { user_id } = req.params;
    const deletedUser = await deleteUserDb(user_id);
    res.json(deletedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllUsers,
  createUser,
  deleteUser
};
