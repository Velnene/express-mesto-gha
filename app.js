const express = require('express');
const app = express();
const { PORT = 3000 } = process.env;
app.use((req, res, next) => {
  req.user = {
    _id: '6442900abc4162f75e7abdd7',
  };

  next();
});

const { userRouter, cardRouter } = require('./routes')
app.use(express.json())
app.use(userRouter);
app.use(cardRouter);



const mongoose = require('mongoose');

mongoose.connect('mongodb://0.0.0.0:27017/mestodb', {});



app.listen(PORT, () => {
  console.log("server started on port " + PORT)

});
