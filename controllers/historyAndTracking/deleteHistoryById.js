const createError = require("http-errors");
const shipMentModal = require("../../models/shipmentModel");
const jwt = require("jsonwebtoken");
const { accessSecret, refreshSecret, accessTokenLife, refreshTokenLife } =
  require("../../config/keys").jwt;
  var mongoose = require('mongoose'); 


const deleteHistoryById = async (req, res, next) => {
  try {
    if (!req.headers["authorization"])
    return next(createError.Unauthorized("Request is missing mandatory Header"));

    const orderId=req.params.id

  const token = req.headers["authorization"];
  const decodedToken = jwt.verify(token, accessSecret);
  const userId = mongoose.Types.ObjectId(decodedToken.userId);

//   console.log(orderId,userId)
const deleteShipMents = await shipMentModal.findOne({_id:orderId});

if(!deleteShipMents){
  return  res.status(400).send({status : false ,message:"This shipment is already deleted"})
}
 
  await shipMentModal.findOneAndDelete({_id:orderId,userId:userId});
         
  return   res.json({
      success: true,
      status: 200,
      message: "ShipMent deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = deleteHistoryById;