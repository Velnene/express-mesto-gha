const express = require('express');
const mongoose = require('mongoose');
const { handleNotFoundUrl } = require('./errors/handleNotFoundUrl');

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
app.patch('*', (req, res) => {
  handleNotFoundUrl(req, res);
});

mongoose.connect('mongodb://0.0.0.0:27017/mestodb', {});

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
