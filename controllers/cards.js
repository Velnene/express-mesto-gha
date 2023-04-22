const Card = require('../models/card');

const {
  BadRequest,
  InternalServer,
  NotFound,
  OK,
  CREATED,
} = require('../errors/responsStatus');

const getCards = (req, res) => {
  Card.find()
    .populate(['owner', 'likes'])
    .then((users) => {
      res.status(OK).send({ data: users });
    })
    .catch(() => {
      res.status(InternalServer).send({ message: 'error' });
    });
};

const createCard = (req, res) => {
  const owner = req.user._id;
  const { name, link } = req.body;
  Card.create({ name, link, owner })
    .then((card) => {
      res.status(CREATED).send({ data: card });
    })
    .catch((e) => {
      if (e.name === 'ValidationError') {
        res.status(BadRequest).send({ message: 'Поля неверно заполнены' });
      } else {
        res.status(InternalServer).send({ message: 'Smth went wrong' });
      }
    });
};

const deleteCard = (req, res) => {
  const { cardId } = req.params;
  Card.findByIdAndRemove(cardId)
    .populate(['owner', 'likes'])
    .then((card) => {
      if (card) {
        res.send({ message: 'Карточка удалена' });
      } else {
        res.status(NotFound).send({ message: 'Карточка не найдена' });
      }
    })
    .catch((e) => {
      if (e.name === 'CastError') {
        res.status(BadRequest).send({ message: 'Ошибка ввода' });
      } else {
        res.status(InternalServer).send({ message: 'Smth went wrong' });
      }
    });
};

const addLikeikeCard = (req, res) => {
  const userId = req.user._id;
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: userId } }, { new: true })
    .populate(['owner', 'likes'])
    .then((like) => {
      if (like) {
        res.send({ data: like });
      } else {
        res.status(NotFound).send({ message: 'Карточка не найдена' });
      }
    })
    .catch((e) => {
      if (e.name === 'CastError') {
        res.status(BadRequest).send({ message: 'Карточка не найдена' });
      } else {
        res.status(InternalServer).send({ message: 'Smth went wrong' });
      }
    });
};

const deleteLikeikeCard = (req, res) => {
  const userId = req.user._id;
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: userId } })
    .populate(['owner', 'likes'])
    .then((like) => {
      if (like) {
        res.send({ data: like });
      } else {
        res.status(NotFound).send({ message: 'Карточка не найдена' });
      }
    })
    .catch((e) => {
      if (e.name === 'CastError') {
        res.status(BadRequest).send({ message: 'Карточка не найдена' });
      } else {
        res.status(InternalServer).send({ message: 'Smth went wrong' });
      }
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  addLikeikeCard,
  deleteLikeikeCard,
};
