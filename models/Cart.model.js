const { Schema, model } = require("mongoose");

const CartSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  items: [
    {
      type: Schema.Types.ObjectId,
      ref: "CartItem",
      required: false,
    },
  ],
});

module.exports = model("Cart", CartSchema, "carts");
CartSchema.index({ user: 1, "items.productId": 1 }, { unique: true });
