const ParcelModel = require("../../models/ParcelModel");
// var XMLHttpRequest = require('xhr2');
const createError = require("http-errors");
const axios= require("axios")
//const { createQuoteValidation } = require("../../services/validation_schema");


const generateAccessToken = async (req, res, next) => {
  let body={
    client_id: 'l75ea44aae02c14e0a87a4372a5ee9b5e3',
    client_secret: '53df11baa20c42ea9e6604406c6be8a5',
    grant_type: 'client_credentials'
  }
try{
  var querystring = require('querystring');
  //...
  let response =await axios.post("https://apis-sandbox.fedex.com/oauth/token",
      querystring.stringify(body), {
        headers: { 
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(function(response) {
        req.headers = { Authorization: response.data.access_token };
        next()
      });
    }
    catch (error){
        next(error);
    }
}


module.exports = generateAccessToken;