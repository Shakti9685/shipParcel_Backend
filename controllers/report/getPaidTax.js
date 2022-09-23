const Order = require("../../models/Order.model");
const TaxReport = require("../../models/TaxReport.model");
const getPaidTax = async (req, res, next) => {
  const startIndex = parseInt(req.query.startIndex) || 0;
  const viewSize = parseInt(req.query.viewSize) || 10;
  const searchCriteria = {};

  if (req.query.keyword) {
    searchCriteria["$or"] = [
      {
        orderId: {
          $regex: req.query.keyword.trim(),
          $options: "i",
        },
      },
    ];
  }

  try {
    const taxReport = await TaxReport.aggregate([
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
      message: "Paid tax list fetched successfully",
      taxReport: taxReport[0].data,
      totalCount:
        !!taxReport[0].count[0] === true ? taxReport[0].count[0].total : 0,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getPaidTax;
