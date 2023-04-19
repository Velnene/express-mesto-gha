const express = require('express');
const app = express();

const { PORT = 3000, BATH_PATH } = process.env;
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mydb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
});

app.listen(3000, (() => {
  console.log(BATH_PATH)
  console.log("server starting")
}));
