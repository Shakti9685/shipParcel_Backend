const User = require("../../models/User.model");
const bcrypt = require("bcryptjs");
const { ObjectId } = require("mongoose").Types;

const updateUser = async (req, res) => {
  try {
    // update user
    const { _id: id } = req.user;
    console.log(req.user);
    const { firstName, phone, email, address, companyName } = req.body;

    const updateUser = await User.findOneAndUpdate(
      { _id: ObjectId(id) },
      {
        firstName,
        email,
        companyName,
      },
      { new: true }
    );
    if (phone) {
      updateUser.phone = phone;
    }
    if (address) {
      updateUser.address = address;
      primaryAddress = address.address_line_1;
    }
    await updateUser.save();

    res.status(200).json({
      message: "User updated successfully",
      data: updateUser,
    });
  } catch (err) {
    res.status(400).send({ message: "Error occured" });
  }
};

module.exports = updateUser;
