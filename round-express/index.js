require('dotenv').config();
const mongoose = require('mongoose')

const express = require('express');
const app = express();
const port = 3000;

// const cors = require('cors')
// const corsOptions = {
//   origin: 'http://localhost:3000/',
//   optionsSuccessStatus: 200
// }
// app.use(cors(corsOptions))


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

app.get('/', (req, res) => {
    res.send('Hello World!')
    res.send('Welcome to JSON Get response demo page');
})

app.get('/welcome', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.json({ message: 'Welcome traveller' })
    console.log('http://localhost:3000/welcome');

})

var customer_list = [
    { customer_id: 1 },
    { customer_id: 2 },
    { customer_id: 3 },
    { customer_id: 4 },
    { customer_id: 5 },
    { customer_id: 6 },
    { customer_id: 7 },
    { customer_id: 8 },
    { customer_id: 9 },
    { customer_id: 10 }
];

// return an array
app.get('/listofcustomers', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.json(customer_list);
    console.log('return an array as json');
    console.log('http://localhost:3000/continents');

})

app.get('/listofcustomers2', getCustomers2);

// Using MongoDB:

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const url = 'mongodb://localhost:27017';

const dbName = 'round';
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true } );

// Connect to MongoDB server, run the findDocuments function and close the connection.
client.connect(function(err) {

    assert.equal(null, err);
    console.log('Connected successfully to MongoDB server on port 27017');
    const db = client.db(dbName);

    findDocuments(db, function() {
        client.close();
    });
});

const findDocuments = function(db, callback) {

    const collection = db.collection('customers');
  
    collection.find({}).toArray(function(err, docs) {
      assert.equal(err, null);
      console.log('Found the following documents:');
      console.log(docs)
      mongoDocsToDisplay = docs;
      callback(docs);
    });
  }



//connect to db on mongodb atlas
// mongoose.connect(process.env.MONGO_URI)
//     .then(() => {
//         //listen for requests
//         app.listen(process.env.PORT, () => {
//             console.log('listening on port', process.env.PORT)
//         })
//     })
//     .catch((error) => {
//         console.log(error)
//     })

// const conn_str = 'mongodb+srv://anumit:ESpZe2pBfXP7yeuK@cluster0.5kd8ymu.mongodb.net';
// mongoose.connect(
//     conn_str,
//     {
//         useNewUrlParser: true,
//         useUnifiedTopology: true
//     }, (err) => {
//         if (err) {
//             console.log("error in connection");
//         } else {
//             console.log("mongodb is connected");
//         }
//     });


// const url = 'mongodb+srv://anumit:ESpZe2pBfXP7yeuK@cluster0.5kd8ymu.mongodb.net';
// const connectionParams = {
//     useNewUrlParser: true,
//     //useCreateIndex: true,
//     useUnifiedTopology: true
// }
// mongoose.connect(url, connectionParams)
//     .then(() => {
//         console.log('Connected to the database ')
//     })
//     .catch((err) => {
//         console.error(`Error connecting to the database. n${err}`);
//     })



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})