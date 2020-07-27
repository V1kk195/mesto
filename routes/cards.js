const router = require('express').Router();
const {
  getCards, createCard, deleteCard, addLike, removeLike,
} = require('../controllers/cards');
const { validateCard, validateParamsCardId } = require('../middlewares/validation');

router.get('/cards', getCards);

router.post('/cards', validateCard, createCard);

router.delete('/cards/:cardId', validateParamsCardId, deleteCard);

router.put('/cards/:cardId/likes', validateParamsCardId, addLike);

router.delete('/cards/:cardId/likes', validateParamsCardId, removeLike);

module.exports = router;
