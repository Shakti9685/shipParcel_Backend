const { Schema, model } = require("mongoose");

// order schema
const OrderSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    orderId: {
      type: String,
      required: false,
    },
    type: {
      enum: ["online", "offline"],
      type: String,
      default: "",
    },
    productData: [
      {
        sku: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },

        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
        },
        barcode: {
          type: String,
        },
        category: {
          type: Schema.Types.ObjectId,
          ref: "Category",
        },
      },
    ],
    paymentmethod: {
      type: String,
      enum: [
        "Credit card",
        "Bank Wire",
        "Cash",
        "Cheque",
        "Pay by phone",
        "Credit card on phone",
      ],
    },
    notes: {
      type: String,
    },
    total: {
      type: Number,
      required: true,
    },
    subTotal: {
      type: Number,
    },
    tax: {
      type: Number,
    },
    volumeTax: { type: Number },
    status: {
      type: String,
      required: true,
      enum: ["pending", "processing", "shipped", "delivered"],
      default: "pending",
    },
    tracking: {
      type: String,
      required: false,
    },

    address: {
      address_line_1: {
        type: String,
      },
      address_line_2: {
        type: String,
      },

      city: {
        type: String,
      },
      country_code: {
        type: String,
      },
      postal_code: {
        type: String,
      },
      state_code: {
        type: String,
      },
    },
    shippingFee: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = model("Order", OrderSchema, "orders");
