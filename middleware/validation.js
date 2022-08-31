const { check } = require("express-validator");

let validateObj = {};

productId = [
    check("productId", "product Id is required")
        .not()
        .isEmpty()
        .withMessage("Product Id cannot be empty"),
],

quantity = [
    check("quantity", "quantity is required")
        .not()
        .isEmpty()
        .withMessage("quantity cannot be empty")
],

validateObj.addToCart = [...productId, ...quantity];

module.exports = validateObj;