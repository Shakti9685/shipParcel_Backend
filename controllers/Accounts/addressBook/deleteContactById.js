const createError = require("http-errors");
const AddressModel = require("../../../models/Address.model");
// const jwt = require("jsonwebtoken");
// const { accessSecret, refreshSecret, accessTokenLife, refreshTokenLife } =
//   require("../../config/keys").jwt;
//   var mongoose = require('mongoose'); 


const deleteContactById = async (req, res, next) => {
  try {
    // if (!req.headers["authorization"])
    // return next(createError.Unauthorized("Request is missing mandatory Header"));

    const contactId=req.params.contactId

//   const token = req.headers["authorization"];
//   const decodedToken = jwt.verify(token, accessSecret);
//   const userId = mongoose.Types.ObjectId(decodedToken.userId);

//   console.log(orderId,userId)
const deleteShipMents = await AddressModel.findOne({ _id : contactId });

if(!deleteShipMents){
  return  res.status(400).send({status : false ,message:"This contact is already deleted"})
}
 
  await AddressModel.findOneAndDelete({_id : contactId});
         
  return   res.json({
      success: true,
      status: 200,
      message: "Contact deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = deleteContactById;