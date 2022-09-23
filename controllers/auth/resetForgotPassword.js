// const bcrypt = require("bcryptjs");
// const createError = require("http-errors");

// // import nodemailer function and verification template
// const sendEmail = require("../../config/nodemailer");
// const emailTemplate = require("../../config/emailTemplates/emailTemplate");

// const User = require("../../models/User.model");
// const VerifyToken = require("../../models/VerifyToken.model");
// const Token = require("../../models/Token.model");

// const resetPassword = async (req, res, next) => {
//   try {
//     const { userid, token, password } = req.body;
//     if (!userid || !token || !password) throw createError.BadRequest();
//     const tokenDetails = await VerifyToken.findOne({
//       _userId: userid,
//       tokenType: "password",
//     });
//     if (!tokenDetails)
//       throw createError.BadRequest(
//         "This link seems to have been expired. Please try again."
//       );
//     const user = await User.findOne({ _id: userid });
//     if (!user)
//       throw createError.BadRequest(
//         "We were unable to find a user for this link. Please SignUp!"
//       );
//     // compare token
//     const isMatch = await bcrypt.compare(token, tokenDetails.token);
//     if (!isMatch) throw createError();
//     // this runs when the request is legit
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);
//     if (!hashedPassword) {
//       throw createError.BadRequest(
//         "Your request could not be processed. Please try again after some time."
//       );
//     }

//     user.password = hashedPassword;
//     // Save user to DB
//     const createdUser = await user.save();
//     if (!createdUser)
//       throw createError.BadRequest(
//         "Your request could not be processed. Please try again after some time."
//       );

//     // remove all refresh tokens
//     const deleted = await Token.deleteMany({ _userId: createdUser._id });
//     if (!deleted) throw createError.InternalServerError();

//     // send password change confirmation email to user
//     const message = {
//       subject: "Password Successfully changed",
//       body: emailTemplate(createdUser, "", "confirmPassword"),
//     };

//     sendEmail(createdUser.email, message);

//     res.status(200).json({
//       success: true,
//       message: "Password Successfully changed",
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// module.exports = resetPassword;
