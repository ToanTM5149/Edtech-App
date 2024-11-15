const { BlobServiceClient, StorageSharedKeyCredential } = require('@azure/storage-blob');
require('dotenv').config();

const account = process.env.AZURE_STORAGE_ACCOUNT;
const accountKey = process.env.AZURE_STORAGE_ACCESS_KEY;
const blobEndpoint = process.env.AZURE_STORAGE_BLOB_ENDPOINT;

const sharedKeyCredential = new StorageSharedKeyCredential(account, accountKey);
const blobServiceClient = new BlobServiceClient(blobEndpoint, sharedKeyCredential);

async function testConnection() {
    try {
        const containers = blobServiceClient.listContainers();
        console.log("Connected to Azure Blob Storage successfully!");
        for await (const container of containers) {
            console.log(`Container: ${container.name}`);
        }
    } catch (err) {
        console.error("Connection failed: ", err);
    }
}

testConnection();
