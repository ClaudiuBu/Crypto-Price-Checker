const express = require("express");
const bodyParser = require("body-parser");
var request = require("request");


const app = express();
app.use(express.static(__dirname + '/'));
var port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
    // console.log(req.body.crypto);
    // console.log(req.body.fiat);
    var crypto = req.body.crypto;
    var fiat = req.body.fiat;
    var amount = req.body.amount;

    var pair = crypto + fiat;
    console.log("Pair chosen is: " + pair);


    var options = {
        url: "https://apiv2.bitcoinaverage.com/convert/global",
        method: "GET",
        qs: {
            from: crypto,
            to: fiat,
            amount: amount
        }

    }

    request(options, function (error, response, body) {

        var data = JSON.parse(body);
        var price = data.price;
        console.log(price);
        var timeStamp = data.time;

        res.write("<p>Current time:" + timeStamp + " UK Time</p>");
        res.write("<h1>The price of " + crypto + " is: " + price + " " + fiat + "</h1>");


        res.send();
        console.log("Bitcoin price is:" + price);


    })

});
function priceShow() {
    $("title").text("Bitcoin price is " + price + " USD ");
}
app.listen(port, function () {
    console.log("Server is running on port " + port + ".");
})