const Cards = require('../models/cards');
const NotFoundError = require('../errors/not-found-error');
const BadRequestError = require('../errors/bad-request-error');
const ForbiddenError = require('../errors/forbidden-error');

module.exports.getCards = (req, res, next) => {
  Cards.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  Cards.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(err.message));
      } else {
        next(err);
      }
    });
};

module.exports.deleteCard = (req, res, next) => {
  Cards.findById(req.params.cardId)
    .orFail()
    .then((card) => {
      if (!card.owner.equals(req.user._id)) {
        return Promise.reject(new ForbiddenError('Вы пытаетесь удалить чужую карточку'));
      }
      return Cards.deleteOne(card);
    })
    .then(() => res.send({ message: `Card ${req.params.cardId} has been deleted` }))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        next(new NotFoundError(`Карточка ${req.params.cardId} не существует`));
      } else if (err.name === 'CastError') {
        next(new BadRequestError(`Неправильный формат ID карточки ${req.params.cardId}`));
      } else {
        next(err);
      }
    });
};

module.exports.addLike = (req, res, next) => {
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
        next(new NotFoundError(`Карточка ${req.params.cardId} не существует`));
      } else if (err.name === 'CastError') {
        next(new BadRequestError(`Неправильный формат ID карточки ${req.params.cardId}`));
      } else {
        next(err);
      }
    });
};

module.exports.removeLike = (req, res, next) => {
  Cards.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        next(new NotFoundError(`Карточка ${req.params.cardId} не существует`));
      } else if (err.name === 'CastError') {
        next(new BadRequestError(`Неправильный формат ID карточки ${req.params.cardId}`));
      } else {
        next(err);
      }
    });
};
