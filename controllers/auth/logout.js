const jwt = require("jsonwebtoken");

const { refreshSecret } = require("../../config/keys").jwt;

const Token = require("../../models/RefreshToken.model");

const logoutUser = async (req, res, next) => {
  try {

    if (req.cookies?.auth) {
      const { auth } = req.cookies;

      if (auth) {
        const { data } = jwt.verify(
          auth !== undefined ? auth : accessToken,
          refreshSecret
        );
        const removeToken = await Token.findOneAndDelete({
          _userId: data?._id,
          token: auth,
        });

        res.cookie("auth", "deleted", {
          expires: new Date(Date.now() + 10000),
          httpOnly: true,
        });
      }
      res.status(200).json({
        success: true,
        message: "User logged out successfully",
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = logoutUser;
