const express = require("express");
let router = express.Router();
const { validationResult } = require("express-validator");
let validate = require("../middleware/validation");
let book = require('../services/bookServices');


function checkValidationResult(req, res, next) {
    console.log('req.body', req.body);
    var result = validationResult(req).array();
    result.length ? res.status(403).send({ message: result[0].msg }) : next();
}

router.route("/addProduct").post(book.addProduct);
router.route("/homepage").get(book.homepage);
router.route("/productListing").get(book.productListing);
router.route("/addToCart").post(
    validate.addToCart,
    (req, res, next) => {
        checkValidationResult(req, res, next);
    }, book.addToCart);
router.route("/cartDetails").get(book.cartDetails);





// router.route("/productDetail").get(
//     validate.productDetail,
//     (req, res, next) => {
//         checkValidationResult(req, res, next);
//     },
//     book.productDetail);

router.route("/productDetail").get(book.productDetail);

module.exports = router;