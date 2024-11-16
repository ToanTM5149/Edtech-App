// controllers/cosmos.controller.js
const { addItem } = require('../services/cosmos.service');
const logger = require('../utils/logger');

async function handleAddItem(req, res) {
    const { databaseId, containerId, item } = req.body;
    if (!databaseId || !containerId || !item) {
        return res.status(400).send('databaseId, containerId, and item are required.');
    }

    try {
        const result = await addItem(databaseId, containerId, item);
        res.status(201).json(result);
    } catch (error) {
        logger.error(`Handle Add Item Failed: ${error}`);
        res.status(500).send(error.message);
    }
}

module.exports = {
    handleAddItem
};
