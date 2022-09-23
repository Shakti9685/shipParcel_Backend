const { Schema, model } = require("mongoose");

// rating schema
const RatingSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    sku: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    review: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = model("Rating", RatingSchema, "ratings");
