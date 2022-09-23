const createError = require("http-errors");
const shipMentModal = require("../../models/shipmentModel");
const jwt = require("jsonwebtoken");
const { accessSecret, refreshSecret, accessTokenLife, refreshTokenLife } =
  require("../../config/keys").jwt;
  var mongoose = require('mongoose'); 


const deleteHistory = async (req, res, next) => {
  try {
    if (!req.headers["authorization"])
    return next(createError.Unauthorized("Request is missing mandatory Header"));

  const token = req.headers["authorization"];
  const decodedToken = jwt.verify(token, accessSecret);
  const userId = mongoose.Types.ObjectId(decodedToken.userId);

 
  await shipMentModal.deleteMany({userId:userId});
         
  return   res.json({
      success: true,
      status: 200,
      message: "Shipment deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = deleteHistory;