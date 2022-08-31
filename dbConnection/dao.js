const mongoose = require('mongoose');
let config = require('../helper/config')();

mongoose.connection.openUri(config.DB_URL, (err, res) => {
    if (err) {
        logger.warn("Failed to connect to database: " + err);
    }
    console.log("MongoDB Connected")
});

mongoose.connection.on("connected", () => {
    console.log("mongoose default connection open to " + config.DB_URL);
});

module.exports = {
    book: require("../model/bookModel"),
    cart: require("../model/cartModel"),
};