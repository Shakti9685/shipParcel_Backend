// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcryptjs");
// const createError = require("http-errors");

// const { generateCryptoKey } = require("../../services/generate_token");
// const { clientURL } = require("../../config/keys").app;

// // import models
// const VerifyToken = require("../../models/VerifyToken.model");
// const { findOne } = require("../../models/VerifyToken.model");

// const oAuthLogin = async (req, res, next) => {
//   try {
//     if (!req.user) throw createError.InternalServerError();

//     const cryptoKey = generateCryptoKey();
//     const hashedKey = await bcrypt.hash(cryptoKey, 10);
//     const existingToken = await VerifyToken.findOne({
//       _userId: req.user._id,
//       tokenType: "oAuthRequest",
//     });
//     if (existingToken) {
//       existingToken.token = hashedKey;
//       const savedRequestToken = await existingToken.save();
//       if (!savedRequestToken) throw createError.InternalServerError();
//     } else {
//       const oAuthRequestToken = new VerifyToken({
//         _userId: req.user._id,
//         token: hashedKey,
//         tokenType: "oAuthRequest",
//       });
//       const savedRequestToken = await oAuthRequestToken.save();
//       if (!savedRequestToken) throw createError.InternalServerError();
//     }

//     const resURI = `${clientURL}/get-token/${req.user._id}/${cryptoKey}`;

//     res.redirect(resURI);
//   } catch (err) {
//     next(err);
//   }
// };

// module.exports = oAuthLogin;
