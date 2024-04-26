var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("customers");
    dbo.createCollection("customers2", function (err, res) {
        if (err) throw err;
        console.log("Collection created!");
        db.close();
    });
});

MongoClient.connect(url)
    .then((db) => {
        console.log('Connected')
        var dbo = db.db('round');
        
        console.log('Connected2')
        // dbo.collection("customers").find({}, function (err, result) {
        //     if (err) throw err;
        //     console.log(result.name);
        //     console.log('find 1');
        //     db.close();
        // });
        dbo.collection("customers").find({}).toArray(function (err, result) {
            if (err) throw err;
            console.log(result);
            db.close();
        });
        console.log('find 2');
    })
    .catch((err) => {
        console.log('Failed...', err)
    })