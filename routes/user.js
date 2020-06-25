const router = require('express').Router();
let users = require('../data/users.json');

users = JSON.parse(JSON.stringify(users).split('"_id":').join('"id":'));

router.get('/users/:id', (req, res) => {
  const user = users.find((elem) => elem.id === req.params.id);
  if (user === undefined) {
    res.status(404);
    res.send({ message: 'Нет пользователя с таким id' });
  } else {
    res.send(JSON.stringify(user));
  }
});

module.exports = router;
