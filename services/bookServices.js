const db = require('../dbConnection/dao');
const fs = require("fs");
const path = require('path');
var mongoose = require('mongoose');

module.exports = {

    addProduct: async (req, res) => {
        try {
            const directoryPath = path.join(__dirname, '../uploads/book.json');
            const jsonString = fs.readFileSync(directoryPath);
            let fileData = JSON.parse(jsonString);
            fileData.forEach(async (element) => {
                var obj = new db.book(element);
                await obj.save();
            });
            res.status(200).send({ message: "Data added successfully" });
        } catch (e) {
            console.log(e);
            res.status(400).send({ message: "Something went wrong" });
        }
    },

    homepage: async (req, res) => {
        let book = await db.book.find();
        if (book !== '') {
            res.status(200).send({ message: "Product gets sucessfully", result: book });
        } else {
            res.status(204).send({ message: "No Product Found" });
        }
    },

    productListing: async (req, res) => {
        try {
            const { page = 1, pageLimit = 10, price = 1 } = req.query;
            if(price == 0){
                res.status(403).send({ message: "Price cannot be 0" });
                return;
            }
            let skip = (page * pageLimit) - pageLimit;
            let Query = [
                {
                    $project: {
                        _id: "$_id",
                        title: "$title",
                        isbn: "$isbn",
                        thumbnailUrl: "$thumbnailUrl",
                        status: "$status",
                        price: "$price",
                        currency: "$currency"
                    }
                },
                { $sort: { 'price': parseInt(price) } },
                {
                    '$facet': {
                        metadata: [{ $count: "total" }, { $addFields: { page: page } }],
                        data: [{ $skip: skip }, { $limit: parseInt(pageLimit) }]
                    }
                }
            ];
            let book = await db.book.aggregate(Query);
            if (book !== '') {
                res.status(200).send({ message: "Product gets sucessfully", result: book });
            } else {
                res.status(204).send({ message: "No Product Found" });
            }
        } catch (e) {
            console.log(e);
            res.status(400).send({ message: "Something went wrong" })
        }
    },

    productDetail: async (req, res) => {
        const { productId } = req.query;
        if (productId == null || productId == '' || productId == undefined) {
            res.status(403).send({ message: "Product Id cannot be empty" })
        }
        let book = await db.book.findOne({ _id: productId });
        if (book !== '') {
            res.status(200).send({ message: "Product gets sucessfully", result: book });
        } else {
            res.status(204).send({ message: "No Product Found" });
        }
    },

    addToCart: async (req, res) => {
        const { productId, quantity } = req.body;
        if (quantity == 0) {
            res.status(403).send({ message: "Quantity cannot be 0" });
            return 0;
        }
        let check = await db.cart.findOne({ productId });
        if (check !== null && check !== '') {
            await db.cart.updateOne({ _id: new mongoose.Types.ObjectId(check._id) }, { $inc: { quantity: quantity } });
        } else {
            let cart = new db.cart({ productId, quantity });
            await cart.save();
        }
        res.status(200).send({ message: "Product added to cart sucessfully" });
    },

    cartDetails: async (req, res) => {
        var Query = [
            {
                '$lookup':
                {
                    from: 'book', localField: 'productId', foreignField: '_id', as: 'productdata'
                },
            },
            {
                $project: {
                    _id: "$_id",
                    productId: { "$arrayElemAt": ["$productdata._id", 0] },
                    title: { "$arrayElemAt": ["$productdata.title", 0] },
                    thumbnailUrl: { "$arrayElemAt": ["$productdata.thumbnailUrl", 0] },
                    currency: { "$arrayElemAt": ["$productdata.currency", 0] },
                    price: { "$arrayElemAt": ["$productdata.price", 0] },
                    quantity: "$quantity",
                }
            }
        ];

        var cartData = await db.cart.aggregate(Query);

        let cart = [];
        let total = 0;
        if (cartData.length > 0) {
            cartData.forEach(element => {
                let subtotal = parseInt(element.price) * parseInt(element.quantity);
                total = total + subtotal;
                cart.push({
                    _id: element._id,
                    productId: element.productId,
                    title: element.title,
                    thumbnailUrl: element.thumbnailUrl,
                    currency: element.currency,
                    price: element.price,
                    quantity: element.quantity,
                    subtotal: subtotal
                })
            });
        }

        if (cart.length !== 0) {
            res.status(200).send({ message: "cart detail gets sucessfully", result: cart, total });
        } else {
            res.status(200).send({ message: "cart is empty", result: [] });
        }


    },

};