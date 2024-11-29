// controllers/files.controller.js
const { uploadFile } = require('../services/files.service');
const logger = require('../utils/logger');

async function handleUpload(req, res) {
    const { containerName, blobName, data } = req.body;
    if (!containerName || !blobName || !data) {
        return res.status(400).send('containerName, blobName, and data are required.');
    }

    try {
        const message = await uploadFile(containerName, blobName, data);
        res.status(201).send(message);
    } catch (error) {
        logger.error(`Handle Upload Failed: ${error}`);
        res.status(500).send(error.message);
    }
}

module.exports = {
    handleUpload
};
