var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

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


// MongoClient.connect(url)
//     .then((db) => {
//         console.log('successfully...')
//         var dbo = db.db("round");
//         dbo.collection("customers").findOne({}, function (err, result) {
//             if (err) throw err;
//             console.log(result.name);
//             db.close();
//         });

//     })
//     .catch((err) => {
//         console.log('Failed...', err)
//     })

const client = new MongoClient('mongodb://localhost:27017/');
let conn;
try {
    conn = await client.connect();
} catch (e) {
    console.error(e);
}
let db = conn.db("round");

app.get("/", async (req, res) => {
    let collection = await db.collection("customers");
    let results = await collection.find({})
        .limit(50)
        .toArray();
    res.send(results).status(200);
});

app.listen(port, () => {
    console.log('Example app listening on port ' + port);
    console.log('');
})