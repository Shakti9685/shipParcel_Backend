const { Schema, model } = require("mongoose");

// notification schema
const NotificationSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: false,
    },
    seen: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = model("Notification", NotificationSchema, "notifications");
