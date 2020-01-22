const router = require('express').Router();
const User = require('../model/User');
const { registerValidation } = require('../validation');

router.post('/register', async (req, res) => {
  const data = req.body;

  // Validate before creating a user
  const { error } = registerValidation(data);
  if (error) return res.status(400).send(error.details[0].message);

  // Check if user is already in database
  const emailExist = await User.findOne({ email: data.email });

  if (emailExist)
    return res
      .status(400)
      .send(`An account with the email ${data.email} already exists`);

  // Create new user
  const user = new User({
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    password: data.password,
  });

  // Save new user
  try {
    const savedUser = await user.save();
    res.send(savedUser);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
