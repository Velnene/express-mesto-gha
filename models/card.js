const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  },
  likes: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, { versionKey: false });

  cardSchema.statics.deleteCard = function foo(cardId, userId) {
    return this.findById(cardId)
      .then((card) => {
        if (!card) {
          res.status(404).send({ message: 'Карточка с указанным _id не найдена' });
        } else if (card.owner.toString() !== userId) {
          res.status(403).send({ message: 'Нет доступа на удаление чужой карточки' });
        } else {
          return card._id;
        }
      })
      .then((id) => this.findByIdAndRemove(id));
  },

  module.exports = mongoose.model('card', cardSchema);
