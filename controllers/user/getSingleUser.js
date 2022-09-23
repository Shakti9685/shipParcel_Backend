const createError = require("http-errors");

// import user model
const User = require("../../models/User.model");
// const PostGift = require("../../models/PostGift.model");
const { ObjectId } = require("mongoose").Types;

const getUser = async (req, res, next) => {
  try {
    const searchCriteria = {};

    if (req.query.keyword) {
      searchCriteria["$or"] = [
        {
          firstName: { $regex: `^${req.query.keyword}`, $options: "i" },
        },
        {
          phone: { $regex: `^${req.query.keyword}`, $options: "i" },
        },
        {
          companyName: { $regex: `^${req.query.keyword}`, $options: "i" },
        },
      ];
    }

    const user = await User.aggregate([
      {
        $match: searchCriteria,
      },
    ]);
    res.json({
      success: true,
      message: "User fetched successfully",
      user,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getUser;
