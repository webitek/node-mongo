// var MongoClient = require('mongodb').MongoClient;
//
// var state = {
//     db: null
// };
//
// exports.connect = function (url, done) {
//     if(state.db){
//         return done();
//     }
//
//     MongoClient.connect(url, function (err, db) {
//         if(err){
//             return done(err);
//         }
//         state.db = db;
//         done();
//     })
// };
//
// exports.get = function() {
//     return state.db;
// }



/*var mongoClient = require("mongodb").MongoClient;

var url = "mongodb://localhost:27017/myapi";
mongoClient.connect(url, function(err, db){

    var collection = db.collection("banner");
    var text = {title: "WELCOME HOME", tel: "044 299 51 45"};
    // collection.insertOne(text, function(err, result){
    //
    //     if(err){
    //         return console.log(err);
    //     }
    //     console.log(result.ops);
    //     db.close();
    // });
});*/


