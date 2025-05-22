const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { createUser, getUserByEmail } = require('../models/userModel');

router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;
  const existingUser = await getUserByEmail(email);
  if (existingUser) return res.status(400).json({ msg: 'Email already exists' });

  const hashed = await bcrypt.hash(password, 10);
  await createUser(name, email, hashed);
  res.status(201).json({ msg: 'User created' });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await getUserByEmail(email);
  if (!user || !(await bcrypt.compare(password, user.password)))
    return res.status(401).json({ msg: 'Invalid credentials' });

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
  res.json({ token });
});

module.exports = router;
