// config/storage.js
const { BlobServiceClient, StorageSharedKeyCredential } = require('@azure/storage-blob');
require('dotenv').config();

const account = process.env.AZURE_STORAGE_ACCOUNT;
const accountKey = process.env.AZURE_STORAGE_ACCESS_KEY;
const blobEndpoint = process.env.AZURE_STORAGE_BLOB_ENDPOINT;

// Tạo credential
const sharedKeyCredential = new StorageSharedKeyCredential(account, accountKey);

// Tạo BlobServiceClient
const blobServiceClient = new BlobServiceClient(blobEndpoint, sharedKeyCredential);

module.exports = blobServiceClient;
