const { Schema, model } = require("mongoose");

const PaymentSchema = new Schema(
  {
    totalAmount: {
      type: Number,
      required: true,
    },
    payableAmount: {
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
    orderId: {
      type: Schema.Types.ObjectId,
      ref: "Order",
    },
    status: {
      type: String,
      enum: ["pending", "paid", "overdue"],
      default: "pending",
      required: false,
    },
    paymentType: {
      type: String,
      enum: ["fullyPaid", "payLater"],
      required: true,
    },
    notes: {
      type: String,
    },
    partiallyPaidAmount: {
      type: Number,
      required: false,
    },
    transactionRecord: [
      {
        type: Schema.Types.ObjectId,
        ref: "Transaction",
        required: false,
      },
    ],

    dueDate: {
      type: Number,
    },
    chequeDate: {
      type: Date,
    },
    updatedDate: {
      type: Date,
    },
  },
  { timestamps: true }
);

module.exports = model("Payment", PaymentSchema, "payment");
