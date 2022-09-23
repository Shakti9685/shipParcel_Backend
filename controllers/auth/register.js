const bcrypt = require("bcryptjs");
const createError = require("http-errors");

// import nodemailer function and verification template
// const sendEmail = require("../../config/nodemailer");
// const emailTemplate = require("../../config/emailTemplates/emailTemplate");

// import models and helpers
const User = require("../../models/User.model");
// const Token = require("../../models/RefreshToken.model");
// const {
//   generateAccessToken,
//   generateRefreshToken,
//   generateCryptoKey,
// } = require("../../services/generate_token");
const { registerValidation } = require("../../services/validation_schema");
// const { accessTokenLife, refreshTokenLife } = require("../../config/keys").jwt;
// const sendEmail = require("../../services/sendEmail");
// const verifyEmailTemplate = require("../../config/emailTemplates/verifyEmail");
// const VerifyTokenModel = require("../../models/VerifyToken.model");

const registerUser = async (req, res, next) => {
 try {
    //validation code here
    if (!req.body?.email && !req.body?.phoneNumber)
      throw createError.BadRequest(
        "Email or phone number is required for registration."
      );

      console.log(req.body)
    //const result = await registerValidation.validateAsync(req.body);

    // eslint-disable-next-line no-unused-vars
    const {email, password,confirmPassword, userName ,accountType,postalCode,address,businessName,contactName,phone,country,province,city,referral,newsUpdates,apt,termsAndCondition} = req.body;

    //Password matching
    if(password !==confirmPassword){
      throw createError.BadRequest(
        "Password is incorrect"
      );
    }

    // this runs when the user is new
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);


    const user = await User.create({
      email, 
      password: hashedPassword,
      userName ,
      accountType,

    //   address:{
    //     country:country,
    //     province:province,
    //     city:city,
    //     address:address,
    //     postalCode:postalCode,
    //      apt:true
    // },
      postalCode,
      address,
      businessName,
      contactName,
      phone,
      country,
      province,
      city,
      referral,
      newsUpdates,
      apt,
      termsAndCondition
    });

    if (!user)
      throw createError.InternalServerError(
        "Your request could not be processed. Please contact support or try again after some time."
      );

    // generate verify email token and save to db
    // const verificationToken = generateCryptoKey();
    // const hashedToken = await bcrypt.hash(verificationToken, 10);
    // const verification = new VerifyTokenModel({
    //   user: createdUser._id,
    //   token: hashedToken,
    //   type: "verify-email",
    // });
    // await verification.save();

    // send verification email to saved user
    // await sendEmail(
    //   [email],
    //   "Verify your account",
    //   verifyEmailTemplate(
    //     { name: createdUser.name },
    //     `http://localhost:3000/verify-email?vt=${verificationToken}&i=${Buffer.from(
    //       createdUser._id
    //     ).toString("base64")}`
    //   )
    // );

    // generate access and refresh token

    // const jwtPayload = {
    //   _id: createdUser._id,
    //   role: createdUser.role,
    //   email: createdUser.email,
    //   name: createdUser.name,
    //   verified: createdUser.verified,
    // };

    // const accessToken = generateAccessToken(jwtPayload, accessTokenLife);
    // const refreshToken = generateRefreshToken(jwtPayload, refreshTokenLife);
    // if (accessToken && refreshToken) {
    //   const newToken = new Token({
    //     user: user._id,
    //     token: refreshToken,
    //   });
    //   // save refresh token to db
    //   const savedToken = await newToken.save();
    //   if (!savedToken)
    //     throw createError.InternalServerError(
    //       "Your request could not be processed. Please try again."
    //     );
      // send response
      // res.cookie("auth", refreshToken, { httpOnly: true });
      res.status(200).json({
        success: true,
        user: user,
      });
    
  } catch (error) {
    if (error.isJoi === true) error.status = 422;
    next(error);
  }
};

module.exports = registerUser;
