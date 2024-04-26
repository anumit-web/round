const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

console.log('checkpoint 1');

// Connection URL
const url = 'mongodb://localhost:27017';

console.log('checkpoint 2');

// Database Name
const dbName = 'round';

console.log('checkpoint 3');


// Create a new MongoClient
const client = new MongoClient(url);

console.log('checkpoint 4');

// Use connect method to connect to the Server
client.connect(function (err) {

    console.log('checkpoint 5');

    assert.equal(null, err);
    console.log("Connected successfully to server");

    const db = client.db(dbName);

    client.close();
});

console.log('checkpoint 6');
