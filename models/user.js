const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    required: true,
    type: String,
    default: 'https://steamuserimages-a.akamaihd.net/ugc/178286983332159256/08AA6BADB1F61A875276CE4785DC5D6386B7959A/?imw=512&amp;imh=569&amp;ima=fit&amp;impolicy=Letterbox&amp;imcolor=%23000000&amp;letterbox=true',
  },
});

module.exports = mongoose.model('user', userSchema);
