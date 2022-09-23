const createError = require("http-errors");

// import verify token model and user model
const UserFollow = require("../../../models/UserFollow.model");
const User = require("../../../models/User.model");
const Notification = require("../../../models/Notification.model");
const cancelSubscriptionService = require("../../user/subscriptions/cancelSubscriptionService");
const removeAsFollowing = async (req, res, next) => {
  const { _id: userId } = req.user;
  try {
    const followRecord = await UserFollow.findOne({
      to: req.params.id,
      from: userId,
      status: "accepted",
    });
    if (!followRecord) {
      throw createError.BadRequest("You do not follow this user");
    }
    await UserFollow.findOneAndDelete({
      to: req.params.id,
      from: userId,
      status: "accepted",
    });
    await User.findOneAndUpdate(
      { _id: req.params.id },
      {
        $pull: { followers: userId },
      }
    );
    await User.findOneAndUpdate(
      { _id: userId },
      {
        $pull: { following: req.params.id },
      }
    );

    // if subscription exist remove subscription too..
    const userDetail = await User.findOne({ _id: userId });
    if (userDetail?.subscribing?.includes(req.params.id)) {
      //unsubscribe the user...

      await cancelSubscriptionService(userId, req.params.id);
    }
    await Notification.findOneAndDelete({
      actor: userId,
      receiver: req.params.id,
      verb: "new-follow",
    });
    await Notification.findOneAndDelete({
      actor: req.params.id,
      receiver: userId,
      verb: "follow-accept",
    });
    res.json({ message: "success" });
  } catch (error) {
    next(error);
  }
};

module.exports = removeAsFollowing;
