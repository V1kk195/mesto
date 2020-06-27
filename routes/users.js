const router = require('express').Router();
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
  fsPromises.readFile('./data/users.json', { encoding: 'utf8' })
    .then((data) => {
      const obj = JSON.parse(data.split('"_id":').join('"id":'));
      const user = obj.find((elem) => elem.id === req.params.id);
      if (user === undefined) {
        res.status(404).send({ message: 'Нет пользователя с таким id' });
      } else {
        res.type('application/json').send(user);
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
});

module.exports = router;
