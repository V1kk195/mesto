const router = require('express').Router();
const users = require('../data/users.json');

router.get('/', (req, res) => {
  res.send(users);
});

module.exports = router;
