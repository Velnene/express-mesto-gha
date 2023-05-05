const express = require('express');
const mongoose = require('mongoose');
const { handleNotFoundUrl } = require('./errors/handleNotFoundUrl');
const { login, createUser } = require('./controllers/user');
const { loginValidate, createValidate } = require('./errors/userError')

const app = express();
const { PORT = 3000 } = process.env;

const { userRouter, cardRouter } = require('./routes');

app.use(express.json());
app.use(userRouter);
app.use(cardRouter);
app.patch('*', (req, res) => {
  handleNotFoundUrl(req, res);
});

app.post('/signin', loginValidate, login);
app.post('/signup', createValidate, createUser);

mongoose.connect('mongodb://0.0.0.0:27017/mestodb', {});

app.listen(PORT, () => { });
