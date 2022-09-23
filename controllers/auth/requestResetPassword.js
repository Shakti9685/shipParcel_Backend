// const bcrypt = require("bcryptjs");
// const createError = require("http-errors");

// const { generateCryptoKey } = require("../../services/generate_token");

// // import nodemailer function and email template
// const sendEmail = require("../../config/nodemailer");
// const emailTemplate = require("../../config/emailTemplates/emailTemplate");

// // import models
// const User = require("../../models/User.model");
// const VerifyToken = require("../../models/VerifyToken.model");

// const { emailValidation } = require("../../services/validation_schema");

// const requestResetPassword = async (req, res, next) => {
//   try {
//     // validate input email
//     const { email } = await emailValidation.validateAsync(req.body);
//     // find email in db
//     const user = await User.findOne({ email });
//     if (!user)
//       throw createError.BadRequest(
//         "This email is not associated to any account. Please register."
//       );

//     // generate request reset password token and save to db
//     const requestPasswordToken = generateCryptoKey();
//     const hashedToken = await bcrypt.hash(requestPasswordToken, 10);
//     const passwordRequest = new VerifyToken({
//       _userId: user.id,
//       token: hashedToken,
//       tokenType: "password",
//     });
//     const savedPasswordToken = await passwordRequest.save();
//     if (!savedPasswordToken) throw createError.InternalServerError();

//     // send confirmation email to saved user
//     const message = {
//       subject: "Confirm password reset",
//       body: emailTemplate(user, requestPasswordToken, "resetPasswordRequest"),
//     };

//     sendEmail(user.email, message);

//     res.status(200).json({
//       success: true,
//       message: "Email sent to reset password",
//     });
//   } catch (err) {
//     if (err.isJoi === true) err.status = 422;
//     next(err);
//   }
// };

// module.exports = requestResetPassword;
