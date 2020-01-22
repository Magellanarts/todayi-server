const router = require('express').Router();
const User = require('../model/User');

router.post('/register', (req, res) => {
  const data = req.body;
  const user = new User({
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    password: data.password,
  });
});

module.exports = router;
