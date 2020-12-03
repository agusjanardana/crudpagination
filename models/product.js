var mongoose = require('mongoose')
var Schema = mongoose.Schema

var ProductSchema = new Schema({
    katagori: String,
    name: String,
    price: Number,
    cover: String
})

module.exports = mongoose.model('Product', ProductSchema)