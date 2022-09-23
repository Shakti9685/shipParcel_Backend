const AddressModel = require("../../../models/Address.model");
// const jwt = require("jsonwebtoken");
// const { accessSecret, refreshSecret, accessTokenLife, refreshTokenLife } =
//   require("../../config/keys").jwt;


const createError = require("http-errors");

const getContacts = async (req, res, next) => {
  try {

    // if (!req.headers["authorization"])
    //   return next(createError.Unauthorized("Request is missing mandatory Header"));
    // const token = req.headers["authorization"];
    // const decodedToken = jwt.verify(token, accessSecret);

    const contactData = await AddressModel.aggregate([
        {
            $project:{
              company:1,
              email:1,
              contactName:1,
              province:"$address.province", 
              city:"$address.city"   
            }
        }

    ]);

    res.status(200).send({status:"Success",data: contactData})

  }
  catch (error) {
    next(error);
  }
}


module.exports = getContacts;