/* eslint-disable padded-blocks */
const router = require('express').Router();
const path = require('path');
const fs = require('fs').promises;

const filepath = path.join(__dirname, '../data/users.json');

const getUsers = (req, res) => {
  fs.readFile(filepath, { encoding: 'utf8' })
    .then((data) => {
      const users = JSON.parse(data);
      if (!users) {
        res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
      } else { res.send(users); }

    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

const getUser = (req, res) => {
  fs.readFile(filepath, { encoding: 'utf8' })
    .then((data) => JSON.parse(data).find((user) => user._id === req.params.id))
    .then((data) => {
      if (data) {
        res.send(data);
        return;
      }
      res.status(404).send({ message: 'Нет пользователя с таким id' });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

router.get('/', getUsers);
router.get('/:id', getUser);
