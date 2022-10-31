const shipMentModal = require("../../models/shipmentModel");
const jwt = require("jsonwebtoken");
const { accessSecret, refreshSecret, accessTokenLife, refreshTokenLife } =
  require("../../config/keys").jwt;






const createError = require("http-errors");
const { createShipMentValidation } = require("../../services/validation_schema");


const createShipMent = async (req, res, next) => {
  try {

    if (!req.headers["authorization"])
      return next(createError.Unauthorized("Request is missing mandatory Header"));

    const token = req.headers["authorization"];
    const decodedToken=jwt.verify(token, accessSecret).userId
  
     req.body.userId = decodedToken.toString();
      
   // const result = await createShipMentValidation.validateAsync(req.body);
    // console.log(req.body)

     let data = await shipMentModal.create(req.body)
     console.log(data)

    if (!data)
      res.status(400).send({ status: false, message: "Your request could not be processed. Please contact support or try again after some time." });
        

    res.status(201).json({
      success: true,
      quote: data,
    });

  }
  catch (error) {
    next(error);
  }
}


module.exports = createShipMent;