const createError = require("http-errors");

// import verify token model and user model
const UserFollow = require("../../../models/UserFollow.model");
const User = require("../../../models/User.model");
const newFollowRequestNotification = require("../../../services/notifications/follow/followRequestNotification");
const newFollowNotification = require("../../../services/notifications/follow/newFollowNotification");

const addAsFollowing = async (req, res, next) => {
  try {
    const { _id: userId } = req.user;
    const { id } = req.params;
    if (id) {
      const user = await User.findOne({ _id: id });
      if (!user) throw createError.BadRequest("User does not exist!");
      else {
        const follow = await UserFollow.findOne({
          to: id,
          from: userId,
        });
        if (follow) {
          throw createError.Conflict(
            "You are already following or have sent follow request to this user"
          );
        }
        const newFollow = new UserFollow({
          to: id,
          from: userId,
          status: user.is_private ? "pending" : "accepted",
        });
        const followResponse = await newFollow.save();
        if (!user?.is_private) {
          await User.findOneAndUpdate(
            { _id: id },
            { $addToSet: { followers: userId } }
          );
          await User.findOneAndUpdate(
            { _id: userId },
            { $addToSet: { following: id } }
          );
          newFollowNotification(userId, id, req.io);
        } else {
          newFollowRequestNotification(userId, id, req.io);
        }

        res.status(200).json({
          message: "success",
          data: followResponse,
        });
      }
    } else {
      throw createError.BadRequest("User id not found!");
    }
  } catch (error) {
   
    next(error);
  }
};

module.exports = addAsFollowing;
