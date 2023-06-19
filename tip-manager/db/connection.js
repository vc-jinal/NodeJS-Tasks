const { MongoClient } = require('mongodb');
require('dotenv').config();

//connection url
const url = process.env.URL;
const client = new MongoClient(url);

//database Name
const dbName = 'tip-manager';

async function main() {
    try {
        await client.connect();
        db = client.db(dbName);
        console.log("Database connected successfully");
    } catch (error) {
        console.log(error);
    }
}
main();
module.exports = client;