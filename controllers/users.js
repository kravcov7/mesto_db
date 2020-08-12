const User = require('../models/user');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

const getUserId = (req, res) => {
  const { userId } = req.params;

  User.findById(userId)
    .orFail(() => {
      res.status(404).send({ message: 'Нет пользователя с таким id' });
    })
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: 'Нет пользователя с таким id' });
      } else {
        res.send({ data: user });
      }
    })
    .catch((err) => res.status(500).send({ message: err.message }));
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

const updateUserInfo = (req, res) => {
  const { name, about } = req.body;
  const userId = req.user._id;

  User.findByIdAndUpdate(
    userId,
    { name, about },
    {
      new: true,
      runValidators: true,
      upsert: true,
    },
  )
    .orFail(() => {
      res.status(404).send({ message: 'Нет пользователя с таким id' });
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(400).send({ message: err.message }));
};

module.exports = {
  getUsers,
  getUserId,
  createUser,
  updateUserInfo,
};
