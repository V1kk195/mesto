const router = require('express').Router();
let users = require('../data/users.json');

router.get('/users', (req, res) => {
  res.send(users);
});

router.get('/users/:id', (req, res) => {
  users = JSON.parse(JSON.stringify(users).split('"_id":').join('"id":'));
  const user = users.find((elem) => elem.id === req.params.id);
  if (user === undefined) {
    res.status(404);
    res.send({ message: 'Нет пользователя с таким id' });
  } else {
    res.send(JSON.stringify(user));
  }
});

module.exports = router;
