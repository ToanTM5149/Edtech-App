// middleware/unknownEndpoint.js
const logger = require('../utils/logger');

const unknownEndpoint = (req, res) => {
    logger.warn(`Unknown endpoint: ${req.method} ${req.originalUrl}`);
    res.status(404).send({ error: 'Unknown endpoint' });
};

module.exports = unknownEndpoint;
