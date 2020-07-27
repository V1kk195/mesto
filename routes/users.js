const router = require('express').Router();
const {
  getUsers, getUser, updateUser, updateAvatar,
} = require('../controllers/users');
const { validateParamsUserId, validateUserInfo, validateAvatar } = require('../middlewares/validation');

router.get('/users', getUsers);

router.get('/users/:id', validateParamsUserId, getUser);

router.patch('/users/me', validateUserInfo, updateUser);

router.patch('/users/me/avatar', validateAvatar, updateAvatar);

module.exports = router;
