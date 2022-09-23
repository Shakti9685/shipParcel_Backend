const { Schema, model } = require("mongoose");
const VariantMedia = new Schema({
  url: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
});
const VariantSchema = new Schema(
  {
    sku: {
      type: String,
      unique: true,
    },
    barcode: {
      type: String,
      unique: true,
    },
    volume: {
      type: Number,
    },

    price: {
      wholesaler_price: {
        type: Number,
      },
      distributor_price: {
        type: Number,
      },
      retailer_price: {
        type: Number,
      },
      myPrice: {
        type: Number,
      },
    },
    attributesVal: {
      type: String,
    },

    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    inventory: {
      type: Number,
      required: true,
      default: 0,
    },
    media: [
      {
        type: VariantMedia,
        required: false,
      },
    ],

    // addedBy: {
    //   type: Schema.Types.ObjectId,
    //   ref: "User",
    //   required: true,
    // },
  },
  { timestamps: true }
);

module.exports = model("Variant", VariantSchema, "variants");
