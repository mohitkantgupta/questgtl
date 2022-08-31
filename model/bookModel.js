let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let book = new Schema({
    title: { type: String },
    isbn: { type: String },
    thumbnailUrl: { type: String },
    status: { type: String },
    price: { type: String },
    currency: { type: String }
}, { timestamps: true, versionKey: false });
module.exports = mongoose.model("book", book, "book");