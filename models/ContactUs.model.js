const { Schema, model } = require("mongoose");

const ProductSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      lowercase: true,
      required: true,
      unique: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    phone: {
      type: String,

      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = model("ContactUs", ProductSchema, "contactUs");
