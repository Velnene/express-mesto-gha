const express = require('express')
const userRouter = express.Router();

userRouter.get('/users/:userId', (req, res) => {
  const { userId } = req.params;
  const user = users.find(user => user.id === +userId)

  if (user) {
    res.send({ data: user })
  }
  else {
    res.status(404).send({ message: 'user not found' })

  }
})

userRouter.get('/users', (req, res) => {
  res.send({data: users})
})


userRouter.post('/users', (req, res) => {
  const { name, age } = req.body;
console.log(req.body)
  const user = {
    name,
    id: Math.floor(Math.random()*100+1),
    age,
  };

  users.push(user)
  console.log(users)
  res.status(201).send({data: user})
})

module.exports = userRouter;