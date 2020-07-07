const router = require('express').Router();
const {
  getCards, createCard, deleteCard, addLike,
} = require('../controllers/cards');

router.get('/cards', getCards);

router.post('/cards', createCard);

router.delete('/cards/:cardId', deleteCard);

router.put('/cards/:cardId/likes', addLike);

module.exports = router;
