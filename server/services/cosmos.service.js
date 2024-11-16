// services/cosmos.service.js
const cosmosClient = require('../config/cosmos');
const logger = require('../utils/logger');

async function addItem(databaseId, containerId, item) {
    try {
        const database = cosmosClient.database(databaseId);
        const container = database.container(containerId);
        const { resource } = await container.items.create(item);
        logger.info(`Item added to Cosmos DB: ${JSON.stringify(resource)}`);
        return resource;
    } catch (error) {
        logger.error(`Cosmos DB Add Item Failed: ${error}`);
        throw error;
    }
}

module.exports = {
    addItem
};
