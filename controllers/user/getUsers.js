const createError = require("http-errors");

// import user model
const User = require("../../models/User.model");
const { ObjectId } = require("mongoose").Types;
const getUsers = async (req, res, next) => {
  const startIndex = parseInt(req.query.startIndex) || 0;
  const viewSize = parseInt(req.query.viewSize) || 10;
  const searchCriteria = {};

  if (req.query.keyword) {
    searchCriteria["$or"] = [
      {
        firstName: { $regex: `^${req.query.keyword.trim()}`, $options: "i" },
      },
      {
        lastName: { $regex: `^${req.query.keyword.trim()}`, $options: "i" },
      },
      {
        name: { $regex: `^${req.query.keyword.trim()}`, $options: "i" },
      },
      {
        email: { $regex: `^${req.query.keyword.trim()}`, $options: "i" },
      },
      {
        companyName: { $regex: `^${req.query.keyword.trim()}`, $options: "i" },
      },
    ];
  }

  try {
    const prospectUsers = await User.aggregate([
      {
        $facet: {
          count: [
            {
              $count: "total",
            },
          ],

          data: [
            {
              $project: {
                _id: 1,
                isVerified: 1,
                role: 1,
                firstName: 1,
                lastName: 1,
                phone: 1,
                email: 1,
                companyName: 1,
                userName: 1,
                resaleCertificate: 1,
                einCertificate: 1,
                zipCode: 1,
                address: 1,
                __v: 1,
                name: { $concat: ["$firstName", " ", "$lastName"] },
              },
            },
            {
              $match: {
                ...searchCriteria,
              },
            },
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

module.exports = getUsers;
