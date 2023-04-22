const http2 = require('node:http2');

const CREATED = http2.constants.HTTP_STATUS_CREATED; // 201
const OK = http2.constants.HTTP_STATUS_OK; // 200

const BadRequest = require('./BadRequest');
const InternalServer = require('./InternalServerError');
const NotFound = require('./NotFound');

module.exports = {
  BadRequest,
  InternalServer,
  NotFound,
  CREATED,
  OK,
};
