const router = require('express').Router();
const bcrypt = require('bcryptjs');
const User = require('../model/User');
const jwt = require('jsonwebtoken');
const { registerValidation, loginValidation } = require('../validation');

// Register a new user
router.post('/register', async (req, res) => {
  const data = req.body;

  // Validate before creating a user
  const { error } = registerValidation(data);
  if (error) {
    let message = error.details[0].context.label
      .split(/(?=[A-Z])/)
      .join(' ')
      .capitalize();

    message = `${message} ${error.details[0].message.replace(/".*?"/, '')}`;
    return res.status(400).send(message);
  }

  // Check if user is already in database
  const emailExist = await User.findOne({ email: data.email });
  if (emailExist)
    return res
      .status(400)
      .send(`An account with the email ${data.email} already exists`);

  // Hash password
  const salt = await bcrypt.genSalt(15);
  const hashedPassword = await bcrypt.hash(data.password, salt);

  // Create new user
  const user = new User({
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    password: hashedPassword,
  });

  // Save new user
  try {
    const savedUser = await user.save();
    res.send({ user: user._id });
  } catch (err) {
    res.status(400).send(err);
  }
});

// User Login
router.post('/login', async (req, res) => {
  const data = req.body;

  // Validate fields
  const { error } = loginValidation(data);
  if (error) return res.status(400).send(error.details[0].message);

  // Check if user is already in database
  const user = await User.findOne({ email: data.email });
  if (!user)
    return res
      .status(400)
      .send(`An account with the email ${data.email} does not exist`);

  // Check if password is correct
  const validPass = await bcrypt.compare(data.password, user.password);
  if (!validPass) return res.status(400).send('Invalid password');

  // Create and assign a token
  const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET);
  res.header('auth-token', token).send(token);
});

String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

module.exports = router;
