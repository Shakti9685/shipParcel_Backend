const generateAccessToken = require("../../controllers/quote/generateAccessToken");
const generateShippingLabel = require("../../controllers/shippingLabel/generateShippinglabel");

const router = require("express").Router();



router.get("",generateAccessToken ,generateShippingLabel)


module.exports = router;