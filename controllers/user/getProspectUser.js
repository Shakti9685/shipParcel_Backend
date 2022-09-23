const createError = require("http-errors");

// import user model
const User = require("../../models/User.model");
// const PostGift = require("../../models/PostGift.model");
const { ObjectId } = require("mongoose").Types;
const getProspectUser = async (req, res, next) => {
  const startIndex = parseInt(req.query.startIndex) || 0;
  const viewSize = parseInt(req.query.viewSize) || 10;
  const searchCriteria = {};
  if (req.query.status) {
    searchCriteria["$and"] = [
      {
        status: req.query.status,
      },
    ];
  }
  if (req.query.keyword) {
    searchCriteria["$or"] = [
      {
        firstName: { $regex: `^${req.query.keyword.trim()}`, $options: "i" },
      },
      {
        lastName: { $regex: `^${req.query.keyword.trim()}`, $options: "i" },
      },
      {
        email: { $regex: `^${req.query.keyword.trim()}`, $options: "i" },
      },
    ];
  }

  try {
    const prospectUsers = await ProspectUser.aggregate([
      {
        $match: searchCriteria,
      },
      {
        $facet: {
          count: [
            {
              $count: "total",
            },
          ],

          data: [
            {
              $sort: {
                createdAt: -1,
              },
            },
            {
              $skip: startIndex,
            },
            {
              $limit: viewSize,
            },
          ],
        },
      },
    ]);

    // const totalCount = await ProspectUser.countDocuments(searchCriteria);
    res.status(200).send({
      prospectUserData: prospectUsers[0]?.data,
      totalCount: prospectUsers?.[0]?.count?.[0]?.total,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error while fetching user",
      error: err,
    });
  }
};

module.exports = getProspectUser;
