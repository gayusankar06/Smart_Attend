const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const { name, email, password, role } = req.body;
  const exist = await User.findOne({ email });
  if (exist) return res.status(400).json("Email already exists");

  const hash = await bcrypt.hash(password, 10);
  await User.create({ name, email, password: hash, role });
  res.json("User registered successfully");
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json("Invalid credentials");

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json("Invalid credentials");

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET
  );

  res.json({ token, user: { role: user.role } });
};
