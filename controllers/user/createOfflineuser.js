const createError = require("http-errors");
const User = require("../../models/User.model");
const Cart = require("../../models/Cart.model");
const bcrypt = require("bcryptjs");
const sendEmail = require("../../services/sendEmail");

const { registerValidation } = require("../../services/validation_schema");
const OfflineUser = require("../../template/OfflineUser");

const formidable = require("formidable");

const createOfflineuser = async (req, res, next) => {
  var chars =
    "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var passwordLength = 12;
  var password = "";
  for (var i = 0; i <= passwordLength; i++) {
    var randomNumber = Math.floor(Math.random() * chars.length);
    password += chars.substring(randomNumber, randomNumber + 1);
  }
  try {
    const {
      firstName,
      lastName,
      phone,
      email,
      role,
      companyName,
      city,
      zipCode,
      address,
      userName,
      status,
    } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const userExistingEmail = await ProspectUser.findOne({
      email: email,
    });
    const userExistingEmail2 = await User.findOne({
      email: email,
    });
    if (userExistingEmail || userExistingEmail2) {
      throw createError.BadRequest("Email is not registered");
    }
    console.log(password);
    const prospectUser = new ProspectUser({
      firstName,
      lastName,
      phone,
      email,
      companyName,
      role,
      city,
      zipCode,
      address,
      userName,
      status,
      password: hashedPassword,
    });
    await prospectUser.save();

    const user = new User({
      firstName,
      lastName,
      phone,
      email,
      companyName,
      role,
      city,
      zipCode,
      address,
      userName,
      password: hashedPassword,
    });
    await user.save();

    console.log(user);

    const cart = new Cart({
      user: user._id,
      items: [],
    });
    await cart.save();
    await sendEmail.sendEmail(
      [email],
      `Welcome to OHM Wholesale`,
      OfflineUser(user, password)
    );

    res.status(200).json({
      message: "success",
      user,
      prospectUser,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = createOfflineuser;
