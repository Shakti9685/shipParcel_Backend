const Order = require("../../models/Order.model");
const Variant = require("../../models/Variant.model");
const Category = require("../../models/Category.model");
const { ObjectId } = require("mongoose").Types;

const updateSkuOrder = async (req, res, next) => {
  try {
    const order = await Order.findOne({ orderId: "OHM1020" });
    const data = [];

    for (let x of order.productData) {
      const temp = x._doc || x.doc;
      const variant = await Variant.findOne({
        sku: temp.sku,
      });
      const newItem = {
        ...temp,
        price: variant.price.wholesaler_price,
      };
      data.push(newItem);
    }

    order.productData = data;
    let total = 0;
    let tax = 0;
    let subTotal = order.productData?.reduce((arr, curr) => {
      return +curr.price * curr.quantity + +arr;
    }, 0);

    for (let x of order.productData) {
      const temp = x._doc;
      const category = await Category.findOne({
        _id: temp.category,
      });
      console.log(category, temp);
      tax += (temp.price * category.tax) / 100;
      console.log(tax, "tex");
    }
    total = subTotal + tax;
    order.total = total;
    order.tax = tax;
    order.subTotal = subTotal;

    await order.save();
    res.status(200).json({
      message: "Orders deleted successfully",
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateSkuOrder;
