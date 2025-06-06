const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { createUser, findUserByEmail } = require('../models/userModel');

const signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    findUserByEmail(email, async (err, users) => {
      if (err) return res.status(500).json({ error: 'Internal server error' });
      if (users.length > 0) return res.status(400).json({ message: 'User already exists' });

      const hashedPassword = await bcrypt.hash(password, 10);
      createUser(name, email, hashedPassword, (err) => {
        if (err) return res.status(500).json({ error: 'Could not create user' });
        res.status(201).json({ message: 'User created successfully' });
      });
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    findUserByEmail(email, async (err, users) => {
      if (err) return res.status(500).json({ error: 'Internal server error' });
      if (users.length === 0) return res.status(400).json({ message: 'Invalid credentials' });

      const user = users[0];
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

      const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
        expiresIn: '1d',
      });

      res.json({ message: 'Login successful', token, user: { id: user.id, name: user.name, email: user.email } });
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { signup, login };
