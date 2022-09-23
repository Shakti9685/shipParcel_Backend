const Order = require("../../models/Order.model");
const Category = require("../../models/Category.model");
const TaxReport = require("../../models/TaxReport.model");
const getCategoryTax = async (req, res, next) => {
  try {
    res.json({
      success: true,
      message: "Reports fetched successfully",
      order,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getCategoryTax;
