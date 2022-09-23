const { Schema, model } = require("mongoose");

const CartItem = new Schema(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    cartId: {
      type: Schema.Types.ObjectId,
      ref: "Cart",
      required: true,
    },
    sku: {
      type: String,
    },
    inventory: {
      type: Number,
    },
    subTotal: { type: Number },
    tax: { type: Number },
    total: { type: Number },
  },
  { timestamps: false }
);
CartItem.index({ cartId: 1, sku: 1 }, { unique: true });

module.exports = model("CartItem", CartItem, "cartItems");
