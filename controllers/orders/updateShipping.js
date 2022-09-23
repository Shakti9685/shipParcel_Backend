const Order = require("../../models/Order.model");
const Payment = require("../../models/Payment.model");
const { ObjectId } = require("mongoose").Types;

const updateShipping = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { shippingFee } = req.body;

    const orderData = await Order.findOne({ _id: ObjectId(id) });
    let oldTotal = orderData.total - orderData.shippingFee;

    const order = await Order.findOneAndUpdate(
      { _id: ObjectId(id) },
      {
        total: shippingFee + oldTotal,
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

module.exports = updateShipping;
