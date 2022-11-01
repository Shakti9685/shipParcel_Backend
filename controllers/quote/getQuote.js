const axios = require("axios");
var querystring = require("querystring");
const postalCodes = require("postal-codes-js");
const createError = require("http-errors");
const getQuotes = async (req, res, next) => {
  try {
    console.log(req.headers.Authorization);
    req.body.accountNumber = {
      value: "740561073",
    };
    req.body.rateRequestControlParameters={
      returnTransitTimes: true
    }
    const shipperPostalCode =
      req.body.requestedShipment.shipper.address.postalCode;
    const recipientPostalCode =
      req.body.requestedShipment.recipient.address.postalCode;
    if (postalCodes.validate("CA", shipperPostalCode) != true)
      throw createError.BadRequest("Postal code for shipper is wrong");
    if (postalCodes.validate("CA", recipientPostalCode) != true)
      throw createError.BadRequest("Postal code for shipper is wrong");
    let response = await axios
      .post("https://apis-sandbox.fedex.com/rate/v1/rates/quotes", req.body, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${req.headers.Authorization}`,
        },
      })
      .then(function (response) {
        response.data.output.rateReplyDetails[0].fedxUrl =
          "https://logos-download.com/wp-content/uploads/2016/06/FedEx_logo.png";
        //console.log(response.data.output.rateReplyDetails[0])
        res.status(200).send({ message: response.data });
      });
  } catch (err) {
    next(err);
  }
};
module.exports = getQuotes;