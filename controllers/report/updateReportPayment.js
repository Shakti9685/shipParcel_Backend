const Order = require("../../models/Order.model");
const TaxReport = require("../../models/TaxReport.model");
const updateReportPayment = async (req, res, next) => {
  try {
    const {
      paymentFirstDate,
      paymentLastDate,
      subTotalAmount,
      totalTax,
      totalAmount,
    } = req.body;

    const taxData = new TaxReport({
      paymentFirstDate,
      paymentLastDate,
      subTotalAmount,
      totalTax,
      totalAmount,
      paid: true,
    });
    await taxData.save();
    res.json({
      success: true,
      message: "Payment  data saved successfully",
      taxData,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateReportPayment;
