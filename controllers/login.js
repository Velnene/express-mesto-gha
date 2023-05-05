// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt');
// const User = require('../models/user');

// const checkInfo = (req, res) => {
//   const { email, password } = req.body;

//   if (!email || !password) {
//     res.status(400).send({error: 'Email or password is required'})
//   }

//   User.findOne({ email })
//     .then((user) => {
//       if (!user) {
//         return Promise.reject(new Error('Not User or password'));
//       }
//       return bcrypt.compare(password, user.password);
//     })
//     .then((matched) => {
//       if (!matched) {
//         Promise.reject(new Error('Not User or password'));
//       } res.send({ message: 'OK' });
//     })
//     .catch((err) => {
//       res.status(401).send({ message: err.message });
//     });
// };

// const login = (req, res) => {
//   const { email, password } = req.body;

//   return User.findUserByCredentials(email, password)
//     .then((user) => {
//       const token = jwt.sign({ _id: "d285e3dceed844f902650f40" }, 'some-secret-key', { expiresIn: '7d' });
//       res.send({ token });
//     })
//     .catch((err) => {
//       res
//         .status(401)
//         .send({ message: err.message });
//     });
// };

// module.exports = {
//   checkInfo,
//   login,
// };
