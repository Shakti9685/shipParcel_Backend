const AddressModel = require("../../../models/Address.model");
// const jwt = require("jsonwebtoken");
// const { accessSecret, refreshSecret, accessTokenLife, refreshTokenLife } =
//   require("../../config/keys").jwt;


const createError = require("http-errors");

const getContactsById = async (req, res, next) => {
  try {

    let contactId = req.params.contactId;

    // if (!req.headers["authorization"])
    //   return next(createError.Unauthorized("Request is missing mandatory Header"));
    // const token = req.headers["authorization"];
    // const decodedToken = jwt.verify(token, accessSecret);

  contactData = await AddressModel.findById({ _id : contactId });

    res.status(200).send({ status:"Success", data: contactData });

  }
  catch (error) {
    next(error);
  }
}


module.exports = getContactsById;