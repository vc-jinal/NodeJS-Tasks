const { MongoClient } = require('mongodb');

//connection url
const url = 'mongodb://127.0.0.1:27017';
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