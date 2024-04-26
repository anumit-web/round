require('dotenv').config();
const mongoose = require('mongoose')

const express = require('express');
const app = express();
const port = 3000;

const { expressCspHeader, INLINE, NONE, SELF } = require('express-csp-header');

app.use(expressCspHeader({
    directives: {
        'default-src': [SELF],
        'script-src': [SELF, INLINE, 'somehost.com'],
        'style-src': [SELF, 'mystyles.net'],
        'img-src': ['data:', 'images.com'],
        'worker-src': [NONE],
        'block-all-mixed-content': true
    }
}));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.listen(port, () => {
    console.log('Example app listening on port ' + port);
    console.log('');
})

app.get('/', (req, res) => {
    res.send('Hello World!')
})

// return an array
app.get('/listofcustomers', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.json(customer_list);
    console.log('return an array as json');
    console.log('http://localhost:3000/continents');
})

//app.get('/listofcustomers2', getCustomers2);

var mongoDocsToDisplay = null;
app.get('/mongo', (req, res) => {
    console.log('Inside mongo method');
    res.send(mongoDocsToDisplay);
});


// Using MongoDB:

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const url = 'mongodb://localhost:27017';

const dbName = 'round';
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

// Connect to MongoDB server, run the findDocuments function and close the connection.
client.connect(function (err) {

    console.log('trying to connect . . . . . . ');    
    assert.equal(null, err);
    console.log('Connected successfully to MongoDB server on port 27017');
    const db = client.db(dbName);

    findDocuments(db, function () {
        client.close();
    });
});


const findDocuments = function (db, callback) {

    const collection = db.collection('customers');

    collection.find({}).toArray(function (err, docs) {
        assert.equal(err, null);
        console.log('Found the following documents:');
        console.log(docs)
        mongoDocsToDisplay = docs;
        callback(docs);
    });
}
