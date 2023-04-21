const express = require('express');
const app = express();
const {users} = require('./users')
const { PORT = 3000 } = process.env;
const userRouter = require('./routes/users')
app.use(express.json())
app.use(userRouter);



// const mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost:27017/mestodb');

app.listen(PORT, () => {
  console.log("server started on port " + PORT)
});
