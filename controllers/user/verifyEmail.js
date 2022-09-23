const User = require("../../models/User.model");
const EmailVerify = require("../../models/EmailVerify.model");
const crypto = require("crypto");
const algorithm = "aes-256-cbc";
const { initVector, securitykey } = require("../../config/keys").emailverifyKey;
const sendEmail = require("../../services/sendEmail");
const verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;
    const decipher = crypto.createDecipheriv(
      algorithm,
      securitykey,
      initVector
    );

    let decryptedUserId = decipher.update(token, "hex", "utf-8");

    decryptedUserId += decipher.final("utf8");

    const emailVeriication = await EmailVerify.findOne({
      token: token,
      userId: decryptedUserId,
    }).exec();
    if (!emailVeriication) {
      return res.status(400).send({ message: "Invalid token" });
    }
    const user = await User.findOne({ _id: decryptedUserId }).exec();
    if (user.isVerified) {
      return res.status(400).send({ message: "Email is already verified" });
    }

    user.isVerified = true;
    await user.save();
    await emailVeriication.remove();

    // const html = `<h1>Email Verified  </h1>`;

    // await sendEmail.sendEmail([user.email], "Email Verification", html);
    res.status(200).send({ message: "Email verified successfully" });
  } catch (err) {
    res.status(400).send({ message: "Error occured" });
  }
};

module.exports = verifyEmail;
