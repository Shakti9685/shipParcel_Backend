const { Schema, model } = require("mongoose");

// rating schema
const TaxReportSchema = new Schema(
  {
    paid: {
      type: Boolean,
      default: false,
    },
    paymentFirstDate: {
      type: Date,
      required: true,
    },
    paymentLastDate: {
      type: Date,
      required: true,
    },
    subTotalAmount: {
      type: Number,
    },
    totalTax: {
      type: Number,
    },
    totalAmount: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = model("TaxReport", TaxReportSchema, "taxReport");
