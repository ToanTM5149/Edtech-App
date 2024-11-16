const express = require('express');
const router = express.Router();
const blobServiceClient = require('../config/storage');

// Tải tệp lên Azure Blob Storage
router.post('/upload', async (req, res) => {
    try {
        const containerName = 'uploads';
        const containerClient = blobServiceClient.getContainerClient(containerName);
        await containerClient.createIfNotExists();

        const blobName = 'example.txt';
        const blockBlobClient = containerClient.getBlockBlobClient(blobName);
        const data = 'Hello Azure Blob Storage!';
        await blockBlobClient.upload(data, data.length);

        res.send('File uploaded to Azure Blob Storage');
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;
