const { Schema, model } = require("mongoose");

const TransactionSchema = new Schema(
  {
    amount: {
      type: Number,
      required: true,
    },

    partiallyPaidAmount: {
      type: Number,
      required: false,
    },

    modeOfPayment: {
      type: String,
      enum: [
        "Credit card",
        "Bank Wire",
        "Cash",
        "Pay by phone",
        "Cheque",
        "Credit card on phone",
      ],
      default: "",
      required: true,
    },

    paymentId: {
      type: Schema.Types.ObjectId,
      ref: "Payment",
      required: true,
    },
    updatedDate: {
      type: Date,
    },
    chequeDate: {
      type: Date,
    },
  },

  { timestamps: true }
);

module.exports = model("Transaction", TransactionSchema, "transaction");
