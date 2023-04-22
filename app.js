const express = require('express');
const mongoose = require('mongoose');

const app = express();
const { PORT = 3000 } = process.env;
app.use((req, res, next) => {
  req.user = {
    _id: '6442900abc4162f75e7abdd7',
  };

  next();
});

const { userRouter, cardRouter } = require('./routes');

app.use(express.json());
app.use(userRouter);
app.use(cardRouter);
app.get('*', (req, res) => {
  res.status(404).send({ message: 'Неверный путь' });
});

mongoose.connect('mongodb://0.0.0.0:27017/mestodb', {});

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
