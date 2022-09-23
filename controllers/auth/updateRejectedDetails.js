const createError = require("http-errors");

const ProspectUser = require("../../models/ProspectUser.model");
const User = require("../../models/User.model");
const EmailVerify = require("../../models/EmailVerify.model");
const bcrypt = require("bcryptjs");
const sendEmail = require("../../services/sendEmail");
const { registerValidation } = require("../../services/validation_schema");

const updateRejectedDetails = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      companyName,
      firstName,
      lastName,
      phone,
      address,

      resaleCertificate,
      einCertificate,
    } = req.body;

    const prospectUser = await ProspectUser.findOne({ _id: id });
    if (!prospectUser) {
      throw new Error("User not found");
    }
    const updatedProspectUser = await ProspectUser.findOneAndUpdate(
      { _id: id },
      {
        companyName: companyName,
        firstName: firstName,
        lastName: lastName,
        phone: phone,
        address: address,

        resaleCertificate: resaleCertificate,
        einCertificate: einCertificate,
      },
      { new: true }
    );
    await updatedProspectUser.save();
    res.status(200).json({
      message: "Prospect User Updated",
    });
  } catch (error) {
    next(error);
    res.status(400).json({
      message: "User not found",
    });
  }
};

module.exports = updateRejectedDetails;
