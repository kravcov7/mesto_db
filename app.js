/* eslint-disable no-console */
/* eslint-disable eol-last */
const express = require('express');
const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;
const path = require('path');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

const app = express();

mongoose.connect('mongodb://localhost:27017/mydb', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
});

app.use(express.static(path.join(__dirname, 'public')));
app.use('/users', usersRouter);
app.use('/cards', cardsRouter);
app.use((req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});

app.listen(PORT, () => {
  console.log(`Слушаю порт ${PORT}`);
});