const createError = require("http-errors");

// import user model
const User = require("../../models/User.model");
// const PostGift = require("../../models/PostGift.model");
const { ObjectId } = require("mongoose").Types;

const getUser = async (req, res, next) => {
  try {
    const { _id: userId } = req.user;
    const user_handle = req.params.id;
    const response = await User.findOne({ user_handle });
    if (!response)
      throw createError.InternalServerError("User details can not be fetched");

    const followResp = await User.aggregate([
      { $match: { user_handle } },
      {
        $lookup: {
          from: "userfollows",
          let: { user_id: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$to", "$$user_id"] },
                    { $eq: ["$from", ObjectId(userId)] },
                  ],
                },
              },
            },
          ],
          as: "user_follow",
        },
      },
      {
        $unwind: {
          path: "$user_follow",
        },
      },
      {
        $project: {
          user_follow: 1,
        },
      },
    ]);

    const giftTypes = await PostGift.aggregate([
      { $match: { receiver: response?._id } },
      {
        $group: {
          _id: "$gift",
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 1,
          count: 1,
          gift: 1,
        },
      },
      {
        $lookup: {
          from: "gift",
          localField: "_id",
          foreignField: "_id",
          as: "gift",
        },
      },
      {
        $unwind: { path: "$gift", preserveNullAndEmptyArrays: true },
      },
    ]);

    let messageResponse = {
      _id: response?._id,
      name: response?.name,
      user_handle: response?.user_handle,
      bio: response?.bio,
      gender: response?.gender,
      is_verified: response?.is_verified,
      avatar_url: response?.avatar_url,
      cover_url: response?.cover_url,
      website: response?.website,
      content_average: response?.content_average,
      post_count: response?.posts?.length,
      follower_count: response?.followers?.length,
      is_private: response?.is_private,
      is_followed: false,
      is_subscribing: response?.subscribers?.includes(userId),
      subscription_price: response?.subscription_price || 0,
      subscription_active: response?.subscription_active,
      profileGifts: giftTypes,
    };
    if (followResp.length)
      messageResponse = {
        ...messageResponse,
        is_followed: followResp[0]?.user_follow?.status === "accepted",
        follow_status: followResp[0]?.user_follow?.status,
      };

    res.status(200).json({
      message: "success",
      data: messageResponse,
    });
  } catch (error) {
   
    next(error);
  }
};

module.exports = getUser;
