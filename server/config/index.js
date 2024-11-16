// config/index.js
const db = require('./db');
const cosmosClient = require('./cosmos');
const blobServiceClient = require('./storage');

module.exports = {
    db,
    cosmosClient,
    blobServiceClient
};
