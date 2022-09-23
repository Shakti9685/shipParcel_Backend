var mongoose = require("mongoose");
var Schema = mongoose.Schema;
// create a schema
var verifyEmail = new Schema(
  {
    token: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  {
    versionKey: false,
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);
// the schema is useless so far
// we need to create a model using it
var EmailVerify = mongoose.model("EmailVerify", verifyEmail);

// make this available to our users in our Node applications
module.exports = EmailVerify;
