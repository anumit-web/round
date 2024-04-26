var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

console.log('Hello 1');

// MongoClient.connect(url, function (err, db) {

//     console.log('Hello 2');

//     if (err) throw err;
//     var dbo = db.db("round");
//     dbo.collection("customers").findOne({}, function (err, result) {
//         if (err) throw err;
//         console.log(result.name);
//         db.close();
//     });

//     console.log('Hello 3');

// });


MongoClient.connect(url)
    .then((db) => {
        console.log('successfully...')
        var dbo = db.db("round");
        dbo.collection("customers").findOne({}, function (err, result) {
            if (err) throw err;
            console.log(result.name);
            db.close();
        });

    })
    .catch((err) => {
        console.log('Failed...', err)
    })
