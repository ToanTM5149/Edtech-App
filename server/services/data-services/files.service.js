// services/files.service.js
const { blobServiceClient } = require('../../config');
const logger = require('../utils/logger');

async function uploadFile(containerName, blobName, data) {
    try {
        const containerClient = blobServiceClient.getContainerClient(containerName);
        await containerClient.createIfNotExists({
            access: 'container',
        });
        logger.info(`Container "${containerName}" ready`);

        const blockBlobClient = containerClient.getBlockBlobClient(blobName);
        const uploadBlobResponse = await blockBlobClient.upload(data, Buffer.byteLength(data));
        logger.info(`Blob "${blobName}" was uploaded successfully. RequestId: ${uploadBlobResponse.requestId}`);
        return `Blob "${blobName}" uploaded to container "${containerName}".`;
    } catch (error) {
        logger.error(`Azure Blob Storage Upload Failed: ${error}`);
        throw error;
    }
}

module.exports = {
    uploadFile
};
