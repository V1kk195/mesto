const jwt = require('jsonwebtoken');
const UnauthorisedError = require('../errors/unauthorized-error');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;

  try {
    if (!req.cookies.jwt) {
      // noinspection ExceptionCaughtLocallyJS
      throw new UnauthorisedError('Необходима авторизация');
    }
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    next(new UnauthorisedError('Необходима авторизация'));
  }

  req.user = payload;

  return next();
};
