'use strict';

const server = require('./lib/server');
const logger = require('./lib/logger');

const PORT = process.env.PORT || 3000;

server.start(process.env.PORT, () => logger.log(logger.INFO, `Listening on port ${PORT}`));
