const bcrypt = require("bcryptjs");
const createError = require("http-errors");

// import models and helpers
const Token = require("../../models/RefreshToken.model");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../../services/generate_token");
const User = require("../../models/User.model");
const Cart = require("../../models/Cart.model");

const { loginValidation } = require("../../services/validation_schema");
const { accessTokenLife, refreshTokenLife } = require("../../config/keys").jwt;

const loginUser = async (req, res, next) => {
  try {
    const result = await loginValidation.validateAsync(req.body);
    const { email, password } = result;

      const userLogin = await User.findOne({ email });
      if (!userLogin) throw createError.BadRequest("Email is not registered");
      const isMatch = await bcrypt.compare(password, userLogin.password);
      if (!isMatch) {
        throw createError.Unauthorized("Incorrect password. Please try again.");
      }
      const payload = {
        userId:userLogin._id,
        email: userLogin.email,
        contactName:userLogin.contactName, 
        phoneNumber:userLogin.userLogin,
        businessName:userLogin.businessName,
        userName:userLogin.userName,
        address: userLogin.address,
      };

      const accessToken = generateAccessToken(payload, accessTokenLife);
      const refreshToken = generateRefreshToken(payload, refreshTokenLife);
      if (accessToken && refreshToken) {
        const token = new Token({
          user: userLogin._id,
          token: refreshToken,
        });
        await token.save();

        res.cookie("auth", refreshToken, { httpOnly: true });

        res.status(200).json({
          success: true,
          accessToken,
          user: payload,
        });
      }
    
  } catch (error) {
    if (error.isJoi === true) error.status = 422;
    next(error);
  }
};

module.exports = loginUser;
