const { Schema, model } = require("mongoose");

// category schema
const CategorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    parent: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: false,
    },
    subCategory: [
      {
        type: Schema.Types.ObjectId,
        ref: "Category",
        required: false,
      },
    ],
    tax: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = model("Category", CategorySchema, "categories");
