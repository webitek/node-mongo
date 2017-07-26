
var mongoose = require('mongoose');

var bannerSchema = mongoose.Schema({
    subTitle: String,
    title: {type: String, required: true},
    supTitle: String,
    telTitle: String,
    tel: String
}, {collection: 'banner'});

//export collection
module.exports = mongoose.model('Banner', bannerSchema);
