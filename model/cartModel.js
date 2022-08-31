let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let cart = new Schema({
    productId: { type: Schema.ObjectId, ref: 'book', require: true },
    quantity: { type: Number },
}, { timestamps: true, versionKey: false });
module.exports = mongoose.model("cart", cart, "cart");