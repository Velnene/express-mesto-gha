const express = require('express');
const app = express();
const { PORT = 3000 } = process.env;
app.use((req, res, next) => {
  req.user = {
    _id: '6435395abbde9a409726b391',
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
