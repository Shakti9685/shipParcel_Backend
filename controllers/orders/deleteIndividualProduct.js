const createError = require("http-errors");
const Order = require("../../models/Order.model");
const deleteIndividualProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const order = await Order.findOne({ _id: id });
    if (!order) {
      throw createError(404, "Order not found");
    }
    await order.findOneAndDelete({ _id: id });

    res.json({
      success: true,
      message: "Order remove successfully",
    });
  } catch (error) {
    console.log("error: ", error);
    next(error);
  }
};

module.exports = deleteIndividualProduct;
