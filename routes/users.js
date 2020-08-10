const router = require('express').Router();
const {
  getUsers,
  getUserId,
  createUser,
  updateUserInfo,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/:id', getUserId);
router.post('/', createUser);
router.patch('/me', updateUserInfo);

module.exports = router;
