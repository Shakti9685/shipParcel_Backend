const { Schema, model } = require("mongoose");

const ProductMedia = new Schema({
  url: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
});

const ProductSchema = new Schema(
  {
    isActive: {
      type: Boolean,
      default: true,
    },

    name: {
      type: String,
      required: true,
    },

    currency: {
      type: String,
      default: "USD",
      enum: ["USD", "CAD", "INR", "AUD"],
    },
    description: {
      type: String,
      required: true,
    },
    media: [
      {
        type: ProductMedia,
        required: false,
      },
    ],
    buyCount: {
      type: Number,
      default: 0,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: false,
    },
    subCategory: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
    attributes: {
      type: String,
      required: false,
    },

    shipping_details: {
      weight: {
        type: Number,
      },
      width: {
        type: Number,
      },
      height: {
        type: Number,
      },
      depth: {
        type: Number,
      },
    },

    addedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    available: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = model("Product", ProductSchema, "products");
