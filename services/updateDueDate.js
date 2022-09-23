const createError = require("http-errors");
const dayjs = require("dayjs");
const Order = require("../models/Order.model");
const Payment = require("../models/Payment.model");
const { ObjectId } = require("mongoose").Types;

const updateDueDate = async (id) => {
  try {
    let payment = await Payment.find({ status: "pending" });
    if (!payment) {
      throw createError.BadRequest("Not Found");
    }

    await Promise.all(
      payment.map(async (item) => {
        if (dayjs() > dayjs(item.createdAt).add(item.dueDate, "day")) {
          item.status = "overdue";
          await item.save();
        }
        return item;
      })
    );
  } catch (error) {
    console.log("error: ", error);
  }
};

module.exports = updateDueDate;
