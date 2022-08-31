const express = require('express');
const app = express();
const cors = require("cors");
const config = require('./helper/config')();
const http = require('http').createServer(app);
let bodyParser = require("body-parser");

app.use(cors());

let listener = http.listen(config.PORT, function (error, sucess) {
    if (error !== undefined) {
        console.log("something went wrong == ", error);
    }
    console.log('Api started on port---> ', listener.address().port);
});

require('./dbConnection/dao');

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        limit: "10mb",
        extended: true,
        parameterLimit: 50000,
    })
);

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    if ("OPTIONS" === req.method) {
        res.sendStatus(200);
    } else {
        next();
    }
});

app.use("/", require("./routes/bookRoute"));