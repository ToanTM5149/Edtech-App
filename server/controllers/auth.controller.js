const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userService = require('../services/users.service');

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email và password là bắt buộc' });
    }

    // Kiểm tra user tồn tại bằng email
    const user = await userService.getUserByEmail(email);
    if (!user) {
      return res.status(401).json({ error: 'Email hoặc password không đúng' });
    }

    // Kiểm tra password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: 'Email hoặc password không đúng' });
    }

    // Tạo JWT token
    const token = jwt.sign(
      { 
        user_id: user.user_id,
        email: user.email,
        username: user.username
      },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      message: 'Đăng nhập thành công',
      token,
      user: {
        user_id: user.user_id,
        username: user.username,
        email: user.email,
        full_name: user.full_name,
        phone_number: user.phone_number,
        profile_picture: user.profile_picture,
        interests: user.interests
      }
    });
  } catch (err) {
    console.error("Error in login:", err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  login
};
