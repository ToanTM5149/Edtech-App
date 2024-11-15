const { CosmosClient } = require('@azure/cosmos');
require('dotenv').config();

if (process.env.ALLOW_INSECURE_CONNECTION === 'true') {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
}

const client = new CosmosClient({
    endpoint: process.env.COSMOS_ENDPOINT,
    key: process.env.COSMOS_KEY,
});

async function testConnection() {
    try {
        const { resources: databases } = await client.databases.readAll().fetchAll();
        console.log("Databases:", databases);
        console.log("Connected to Cosmos DB successfully!");
    } catch (err) {
        console.error("Connection failed:", err);
    }
}

testConnection();
