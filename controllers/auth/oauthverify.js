// const bcrypt = require("bcryptjs");
// const createError = require("http-errors");

// // import verify token model and user model
// const VerifyToken = require("../../models/VerifyToken.model");
// const User = require("../../models/User.model");
// const Token = require("../../models/Token.model");
// const {
//   generateAccessToken,
//   generateRefreshToken,
// } = require("../../services/generate_token");
// const { accessTokenLife, refreshTokenLife } = require("../../config/keys").jwt;

// const oAuthVerify = async (req, res, next) => {
//   try {
//     const { userid, token } = req.body;
//     if (!userid || !token) throw createError.BadRequest();
//     const tokenDetails = await VerifyToken.findOne({
//       _userId: userid,
//       tokenType: "oAuthRequest",
//     });
//     if (!tokenDetails)
//       throw createError.BadRequest(
//         "Failed to login from provider. Please login using email."
//       );
//     const user = await User.findOne({ _id: userid });
//     if (!user)
//       throw createError.BadRequest(
//         "We were unable to find a user for this verification. Please SignUp!"
//       );

//     const isMatch = await bcrypt.compare(token, tokenDetails.token);
//     if (!isMatch) throw createError();

//     const deleted = await VerifyToken.findOneAndDelete({
//       _userId: userid,
//       tokenType: "oAuthRequest",
//     });

//     if (!deleted) throw createError.InternalServerError("Please try again.");

//     const payload = {
//       id: user._id,
//     };

//     //Generate new access and refresh tokens
//     const accessToken = generateAccessToken(payload, accessTokenLife);
//     const refreshToken = generateRefreshToken(payload, refreshTokenLife);

//     if (accessToken && refreshToken) {
//       const token = new Token({
//         _userId: user._id,
//         token: refreshToken,
//       });
//       token.save();

//       res.status(200).json({
//         success: true,
//         accessToken,
//         refreshToken,
//         user: {
//           id: user._id,
//           firstName: user.firstName,
//           lastName: user.lastName,
//           email: user.email,
//           role: user.role,
//         },
//       });
//     }
//   } catch (error) {
//     console.log("from oauthverify", error);
//     next(error);
//   }
// };

// module.exports = oAuthVerify;
