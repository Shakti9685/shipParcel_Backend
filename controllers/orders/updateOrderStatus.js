const Order = require("../../models/Order.model");
const { ObjectId } = require("mongoose").Types;

const updateOrderStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const { id } = req.params;

    const order = await Order.findOne({ _id: ObjectId(id) });
    if (!order) {
      throw new Error("Order not found");
    }
    order.status = status;
    await order.save();
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

module.exports = updateOrderStatus;
