const Order = require("../../models/Order.model");
const Payment = require("../../models/Payment.model");
const { ObjectId } = require("mongoose").Types;

const addShippingFee = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { shippingFee, total } = req.body;

    const order = await Order.findOneAndUpdate(
      { _id: ObjectId(id) },
      {
        total: shippingFee + total,
        shippingFee,
      },
      {
        new: true,
      }
    );

    const paymentDetails = await Payment.findOne({
      orderId: ObjectId(id),
    });
    if (!!paymentDetails === true) {
      paymentDetails.totalAmount = order.total;

      paymentDetails.payableAmount = (
        paymentDetails.totalAmount - paymentDetails.partiallyPaidAmount
      )?.toFixed(2);
      await paymentDetails.save();
    }

    res.json({
      success: true,
      status: 200,
      message: "Order updated successfully",
      order,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = addShippingFee;
