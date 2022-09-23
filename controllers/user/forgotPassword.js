const ResetPassword = require("../../models/ResetPassword.model");
const User = require("../../models/User.model");
const sendEmail = require("../../services/sendEmail");
const createError = require("http-errors");

const RejectedUser = require("../../template/RejectedUser");
const AcceptedUser = require("../../template/AcceptedUser");
const OTP = require("../../template/OTP");
const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email: email }).exec();

    if (!user) {
      throw createError.BadRequest("This Email is not registered");
    }
    await ResetPassword.findOneAndDelete({ email: email }).exec();

    const otp = sendEmail.generateOTP();
    const resetotp = new ResetPassword({
      otp,
      email,
    });
    await resetotp.save();
    // await sendEmail.sendEmail(
    //   [email],
    //   `ONE TIME PASSWORD (OTP) - CONFIRMATION`,
    //   OTP(user.firstName, user.lastName, otp)
    // );

    res.status(200).send({ message: "OTP sent successfully", otp });
  } catch (err) {
    next(err);
  }
};

module.exports = forgotPassword;
