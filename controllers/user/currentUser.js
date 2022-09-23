const createError = require("http-errors");

// import user model
const User = require("../../models/User.model");
// const PostGift = require("../../models/PostGift.model");
const { ObjectId } = require("mongoose").Types;

const currentUser = async (req, res, next) => {
  try {
    const user = await User.aggregate([
      {
        $match: {
          _id: ObjectId(req.user._id),
        },
      },

      {
        $project: {
          password: 0,
          __v: 0,
        },
      },
    ]);
    user[0].displayName = user[0].firstName + " " + user[0].lastName;
    res.status(200).json({
      status: "success",
      data: user[0],
    });
  } catch (err) {
    res.status(500).json({
      message: "Error while fetching user",
      error: err,
    });
  }
};

module.exports = currentUser;
