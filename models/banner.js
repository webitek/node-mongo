// var ObjectID = require('mongodb').ObjectID;
// var db = require('../db');


var mongoose = require('mongoose');

var pageSchema = mongoose.Schema({ // создаём схему новой таблицы
    name: String,
    age: Number
});

//export collection
module.exports = mongoose.model('artists', pageSchema); // создаём модель для нашей схемы

// exports.findById = function (id, cb) {
//     db.get().collection('banner').findOne({ _id: ObjectID(id) }, function (err, doc) {
//         cb(err, doc)
//     })
// };

// exports.all = function (cb) {
//     db.get().collection('artists').find().toArray(function (err, docs) {
//         cb(err, docs);
//     })
// };














// exports.findById = function (id, cb) {
//     db.get().collection('artists').findOne({ _id: ObjectID(id) }, function (err, doc) {
//         cb(err, doc)
//     })
// };
//
//
// exports.create = function (artist, cb) {
//     db.get().collection('artists').insert(artist, function (err, result) {
//         cb(err, result);
//     })
// };
//
// exports.update = function (id, newData, cb) {
//     db.get().collection('artists').updateOne(
//         { _id: ObjectID(id)},
//         newData,
//         function (err, result) {
//             cb(err, result);
//         }
//     )
// };
//
// exports.delete = function (id, cb) {
//     db.get().collection('artists').deleteOne(
//         { _id: ObjectID(id) },
//         function (err, result) {
//             cb(err, result);
//         }
//     )
// }