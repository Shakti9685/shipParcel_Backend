const User = require("../../models/User.model");
const bcrypt = require("bcryptjs");

const updatePassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { currentPassword, password } = req.body;

    const user = await User.findOne({ _id: id }).exec();
    if (!user) {
      throw new Error("User not found");
    }
    if (currentPassword === password) {
      throw new Error("New password can't be same as old password");
    }
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).send({ message: "Current Password is incorrect" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const updateUser = await User.findOneAndUpdate(
      { _id: id },
      {
        password: hashedPassword,
      },
      { new: true }
    );

    res.status(200).json({
      message: "Password updated successfully",
      data: updateUser,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};

module.exports = updatePassword;
