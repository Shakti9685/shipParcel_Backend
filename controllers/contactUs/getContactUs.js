const ContactUs = require("../../models/ContactUs.model");
const getContactUs = async (req, res, next) => {
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
        name: { $regex: `^${req.query.keyword}`, $options: "i" },
      },
    ];
  }

  try {
    const contactUs = await ContactUs.aggregate([
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

    res.json({
      success: true,
      message: "ContactUss fetched successfully",
      contactUsData: contactUs[0]?.data,
      totalCount: contactUs?.[0]?.count?.[0]?.total,
    });
  } catch (error) {
    
    next(error);
  }
};

module.exports = getContactUs;
