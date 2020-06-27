const router = require('express').Router();
const fsPromises = require('fs').promises;

router.get('/', (req, res) => {
  fsPromises.readFile('./data/cards.json', { encoding: 'utf8' })
    .then((data) => {
      const obj = JSON.parse(data);
      res.type('application/json').send(obj);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
});

module.exports = router;
