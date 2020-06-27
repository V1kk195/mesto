const router = require('express').Router();
// let users = require('../data/users.json');
const fsPromises = require('fs').promises;

router.get('/users', (req, res) => {
  fsPromises.readFile('./data/users.json', { encoding: 'utf8' })
    .then((data) => {
      const obj = JSON.parse(data);
      res.type('application/json').send(obj);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
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
