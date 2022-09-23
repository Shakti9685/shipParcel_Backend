const Order = require("../../models/Order.model");
const TaxReport = require("../../models/TaxReport.model");
const dayjs = require("dayjs");

const getReports = async (req, res, next) => {
  const searchCriteria = {};

  if (req.query.startDate) {
    searchCriteria["$and"] = [
      {
        createdAt: req.query.startDate,
      },
    ];
  }
  if (req.query.endDate) {
    searchCriteria["$and"] = [
      {
        createdAt: req.query.endDate,
      },
    ];
  }

  try {
    const order = await Order.find({
      $and: [
        { createdAt: { $gt: req.query.startDate } },
        { createdAt: { $lt: req.query.endDate } },
        { tax: { $gt: 0 } },
      ],
    });

    const firstOrderData = await Order.findOne({})
      .sort({ createdAt: 1 })
      .limit(1);
    const lastOrderData = await Order.findOne({})
      .sort({ createdAt: -1 })
      .limit(1);

    // const subTotalPrice = order.reduce((prev, curr) => prev + curr.subTotal, 0);

    const totalTax = order.reduce((prev, curr) => prev + curr.tax, 0);
    const totalVolumeTax = order.reduce(
      (prev, curr) => (prev + !!curr.volumeTax === false ? 0 : curr.volumeTax),
      0
    );

    const totalPrice = order.reduce((prev, curr) => prev + curr.total, 0);
    res.json({
      success: true,
      message: "Reports fetched successfully",
      order,
      // subTotalPrice: subTotalPrice.toFixed(2),
      totalTax: +totalTax?.toFixed(2),
      volumeTax: +totalVolumeTax?.toFixed(2),
      totalPrice: +totalPrice?.toFixed(2),
      firstOrderData: firstOrderData.createdAt,
      lastOrderData: lastOrderData.updatedAt,
      updatedStartDate: req.query.startDate,
      updatedEndDate: req.query.endDate,
      length: order.length,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getReports;
