const ResetPassword = require("../../models/ResetPassword.model");
const User = require("../../models/User.model");
const sendEmail = require("../../services/sendEmail");
const createError = require("http-errors");

const verifyOTP = async (req, res, next) => {
  try {
    const { token } = req.params;

    // decode base64 token
    let buff = Buffer.from(token, "base64");
    let text = buff.toString("ascii");

    const [email, otp] = text.split("-");

    const verifyotp = await ResetPassword.findOne({
      email: email,
      otp: otp,
      isVerified: false,
    }).exec();
    if (!verifyotp) {
      throw createError.BadRequest("OTP is invalid or it may be expired!");
    }

    verifyotp.isVerified = true;
    await verifyotp.save();

    res.status(200).send({ message: "OTP verified successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = verifyOTP;
