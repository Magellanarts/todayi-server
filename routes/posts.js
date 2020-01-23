const router = require('express').Router();
const verify = require('./verifyToken');

router.get('/', verify, (req, res) => {
  res.json({
    user: req.user,
    posts: {
      title: 'my first post',
      description: 'you should be logged in to see this',
    },
  });
});

module.exports = router;
