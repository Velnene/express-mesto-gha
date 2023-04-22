const Card = require('../models/card')
const mongoose = require('mongoose');

const getCards = (req, res) => {
  Card.find()
    .then((users) => {
      console.log(req.user)
      res.send({ data: users })
    })
    .catch((e) => {
      res.status(500).send({ message: 'error' })
    })
}

const createCard = (req, res) => {
  const owner = req.user._id;
  const { name, link } = req.body;
  Card.create({ name, link, owner })
    .then((card) => {
      res.send({ data: card })
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

const deleteCard = (req, res) => {
  const { cardId } = req.params;
  Card.findById(cardId).then((card) => {
    if (card.owner == req.user._id) {
      Card.findByIdAndRemove(cardId)
        .then(() => {
          res.status(200).send({ message: 'Карточка удалена' })
        })
        .catch((e) => {
          if (e.status === 404) {
            res.status(404).send({ message: 'Карточка не найдена' })
          }
          else {
            res.send({ message: 'Smth went wrong' })
          }
        })
    }
  })
}

const addLikeikeCard = (req, res) => {
  const userId = req.user._id;
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: userId } })
    .then((like) => {
      res.send({ data: like })
    })
    .catch(() => {
      if (e.status === 404) {
        res.status(404).send({ message: 'Карточка не найдена' })
      }
      else {
        res.send({ message: 'Smth went wrong' })
      }
    })
};

const deleteLikeikeCard = (req, res) => {
  const userId = req.user._id;
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: userId } })
    .then((like) => {
      res.send({ data: like })
    })
    .catch(() => {
      if (e.status === 404) {
        res.status(404).send({ message: 'Карточка не найдена' })
      }
      else {
        res.send({ message: 'Smth went wrong' })
      }
    })
};




module.exports = {
  getCards,
  createCard,
  deleteCard,
  addLikeikeCard,
  deleteLikeikeCard
}