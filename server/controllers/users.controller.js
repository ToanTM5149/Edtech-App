const userService = require('../services/users.service')
const bcrypt = require('bcrypt')

const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUser();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createUser = async (req, res) => {
  try {
    const { username, email, password, full_name, phone_number, profile_picture, interests, notifications_enabled } = req.body;

    console.log("Received request data:", req.body);

    if (!username || !email || !password || !phone_number) {
      return res.status(400).json({ error: 'Username, email, password và phone_number là bắt buộc' });
    }

    // Kiểm tra trùng lặp
    const duplicateField = await userService.checkUserExists(username, email, phone_number);
    if (duplicateField) {
      const fieldMap = {
        'username': 'Tên đăng nhập',
        'email': 'Email',
        'phone_number': 'Số điện thoại'
      };
      return res.status(400).json({ 
        error: `${fieldMap[duplicateField]} đã tồn tại!`
      });
    }

    // nếu `interests` là chuỗi, chuyển thành mảng
    let formattedInterests = [];
    if (typeof interests === 'string') {
      formattedInterests = [interests];
    } else if (Array.isArray(interests)) {
      formattedInterests = interests;
    } else {
      formattedInterests = []; 
    }

    // Mã hóa password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await userService.createUser({
      username,
      email,
      password: hashedPassword,
      full_name: full_name || null,
      phone_number,
      profile_picture: profile_picture || null,
      interests: JSON.stringify(formattedInterests), 
      notifications_enabled: notifications_enabled || false,
    });

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
    const deletedUser = await userService.deleteUserById(user_id);
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
