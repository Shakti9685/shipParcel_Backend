const createError = require("http-errors");

const User = require("../../models/User.model");
const EmailVerify = require("../../models/EmailVerify.model");
const bcrypt = require("bcryptjs");
const sendEmail = require("../../services/sendEmail");
const Cart = require("../../models/Cart.model");
const RejectedUser = require("../../template/RejectedUser");
const AcceptedUser = require("../../template/AcceptedUser");

const {
  updateProspectValidation,
} = require("../../services/validation_schema");
const crypto = require("crypto");

const algorithm = "aes-256-cbc";
const { securitykey, initVector } = require("../../config/keys").emailverifyKey;

const updateProspectUser = async (req, res, next) => {
  try {
    const { token } = req.params;

    const prospectUser = await ProspectUser.findOne({ _id: token });
    if (!prospectUser) {
      throw new Error("User not found");
    }
    const { status, rejectionCause, role } = req.body;
    await updateProspectValidation.validateAsync(req.body);
    if (status === "REJECTED") {
      if (!rejectionCause) {
        throw new Error("Please enter rejection cause");
      }

      prospectUser.status = status;
      prospectUser.rejectionCause = rejectionCause;
      // const html = `<h1>Hi ${prospectUser.firstName} . OOps, ur rejected</h1>`;

      // await sendEmail.sendEmail(
      //   ["areeb.safvi@simbaquartz.com"],
      //   "Rejected",
      //   html
      // );
      const user = prospectUser.firstName;
      await sendEmail.sendEmail(
        [prospectUser.email],
        `Rejection Application`,
        RejectedUser(user, prospectUser.status)
      );
      res.status(200).json({
        message: "Prospect User rejected ",
      });
    } else if (status === "ACCEPTED") {
      prospectUser.status = status;
      prospectUser.rejectionCause = "";

      const newUser = new User({
        firstName: prospectUser.firstName,
        lastName: prospectUser.lastName,
        phone: prospectUser.phone,
        email: prospectUser.email,
        companyName: prospectUser.companyName,
        userName: prospectUser.userName,
        resaleCertificate: prospectUser.resaleCertificate,
        einCertificate: prospectUser.einCertificate,
        address: prospectUser.address,
        primaryAddress: prospectUser.primaryAddress,
        password: prospectUser.password,
        role: role,
      });
      await newUser.save();

      const updateProspectUser = await ProspectUser.findOneAndUpdate(
        { _id: token },
        {
          role: role,
        },
        { new: true }
      );
      await updateProspectUser.save();
      const cart = new Cart({
        user: newUser._id,
        items: [],
      });
      await cart.save();
      const wishlist = new Wishlist({
        user: newUser._id,
        items: [],
      });
      await wishlist.save();
      if (newUser) {
        const cipher = crypto.createCipheriv(
          algorithm,
          securitykey,
          initVector
        );

        let encryptedUserid = cipher.update(
          newUser._id.toString(),
          "utf-8",
          "hex"
        );

        encryptedUserid += cipher.final("hex");
        const verifyEmail = new EmailVerify({
          userId: newUser._id,
          token: encryptedUserid,
        });
        await verifyEmail.save();
        // let message = `<h1>Welcome to the Suhavi AudioBooks</h1>
        // <p>Please click on the link to verify your account</p>
        // <a href=${config.clientUrl}/user/verify?vt=${encryptedUserid}>${config.clientUrl}/user/verify?vt=${encryptedUserid}</a>`;
        // await sendMessage.sendEmail(
        //   [body.email],
        //   "Account Verification",
        //   message,
        // );
        await sendEmail.sendEmail(
          [prospectUser.email],
          `Accepted Application`,
          AcceptedUser(prospectUser.firstName, prospectUser.status)
        );
        res.status(200).json({
          message: "Prospect User created successfully",
          token: encryptedUserid,
        });
      }
    }
    await prospectUser.save();
  } catch (error) {
    next(error);
  }
};

module.exports = updateProspectUser;
