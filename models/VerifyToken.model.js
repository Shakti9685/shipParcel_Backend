const { Schema, model } = require("mongoose");

const verifyTokenSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "users",
  },
  token: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
    enum: ["verify-email", "forget-password"],
  },
  createdAt: {
    type: Date,
    expires: "7d",
    default: Date.now,
  },
});

const Token = model("verifyToken", verifyTokenSchema, "verifyTokens");

module.exports = Token;
