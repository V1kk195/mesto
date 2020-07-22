const Cards = require('../models/cards');
const NotFoundErr = require('../errors/not-found-err');

module.exports.getCards = (req, res, next) => {
  Cards.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(next);
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  Cards.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: err.message });
      } else {
        res.status(500).send({ message: err.message });
      }
    });
};

module.exports.deleteCard = (req, res) => {
  Cards.findById(req.params.cardId)
    .orFail()
    .then((card) => {
      if (!card.owner.equals(req.user._id)) {
        return Promise.reject(new Error('Вы пытаетесь удалить чужую карточку'));
      }
      return Cards.deleteOne(card);
    })
    .then(() => res.send({ message: `Card ${req.params.cardId} has been deleted` }))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        res.status(404).send({ message: `Card ${req.params.cardId} is not found` });
      } else if (err.name === 'Error') {
        res.status(403).send({ message: err.message });
      } else if (err.name === 'CastError') {
        res.status(400).send({ message: `${req.params.cardId} is invalid ID` });
      } else {
        res.status(500).send({ message: err.message });
      }
    });
};

module.exports.addLike = (req, res) => {
  // if (!req.params.cardId.match(/^[a-fA-F0-9]{24}$/)) {
  //   return res.status(400).send({ message: `${req.params.cardId} is invalid ID` });
  // }

  Cards.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        res.status(404).send({ message: `Card ${req.params.cardId} is not found` });
      } else if (err.name === 'CastError') {
        res.status(400).send({ message: `${req.params.cardId} is invalid ID` });
      } else {
        res.status(500).send({ message: err.message });
      }
    });
};

module.exports.removeLike = (req, res) => {
  Cards.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        res.status(404).send({ message: `Card ${req.params.cardId} is not found` });
      } else if (err.name === 'CastError') {
        res.status(400).send({ message: `${req.params.cardId} is invalid ID` });
      } else {
        res.status(500).send({ message: err.message });
      }
    });
};
