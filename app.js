const express = require('express');
const mongoose = require('mongoose');
const { handleNotFoundUrl } = require('./errors/handleNotFoundUrl');
const { login, createUser } = require('./controllers/user');
const { loginValidate, createValidate } = require('./errors/userError');
const { errors } = require('celebrate');

const app = express();
const { PORT = 3000 } = process.env;

const { userRouter, cardRouter } = require('./routes');

app.use(express.json());
app.post('/signin', loginValidate, login);
app.post('/signup', createValidate, createUser);
app.use(userRouter);
app.use(cardRouter);
app.patch('*', (req, res) => {
  handleNotFoundUrl(req, res);
});
app.use(errors());


mongoose.connect('mongodb://0.0.0.0:27017/mestodb', {});

app.listen(PORT, () => { });
