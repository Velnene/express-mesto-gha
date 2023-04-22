const User = require('../models/user')

const getUserId = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .orFail(() => {
      throw new Error("Not found");
    })
    .then((user) => {
      res.send({ data: user })
    })
    .catch((e) => {
      if (e.message == "Not found") {
        res.status(404).send({ message: 'user not found' })
      }
      else {
        res.status(500).send({ message: 'error' })
      }
    })
}

const getUsers = (req, res) => {
  User.find()
    .then((users) => {
      res.send({ data: users })
    })
    .catch((e) => {
      res.status(500).send({ message: 'error' })
    })
}

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  console.log(req.body)
  User.create({ name, about, avatar })
    .then((user) => {
      res.status(201).send({ data: user })
    })
    .catch((e) => {
      if (e.status === 400) {
        res.status(400).send({ message: 'Поля неверно заполнены' })
      }
      else {
        res.status(500).send({ message: 'Smth went wrong' })
      }
    })
}

module.exports = {
  createUser,
  getUsers,
  getUserId
}
