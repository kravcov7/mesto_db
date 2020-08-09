const router = require('express').Router();
const fs = require('fs').promises;
const path = require('path');

const filepath = path.join(__dirname, '../data/cards.json');

router.get('/', (req, res) => {
  fs.readFile(filepath, { encoding: 'utf8' })
    .then((data) => {
      res.send(JSON.parse(data));
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
});

module.exports = router;
