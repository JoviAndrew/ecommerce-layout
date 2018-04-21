const mongoose = require('mongoose');
const Schema = mongoose.Schema

let itemSchema = mongoose.Schema({
    user: { type: Schema.Types.ObjectId, ref: 'user'},
    item_name: String,
    item_img: String,
    item_price: Number,
}, {
    timestamps: true
})

let item = mongoose.model('item', itemSchema);

module.exports = item;