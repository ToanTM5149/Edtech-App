// config/index.js
const db = require('./db');
const cosmosClient = require('./data_configs/cosmos');
const blobServiceClient = require('./data_configs/storage');

module.exports = {
    db,
    cosmosClient,
    blobServiceClient
};
