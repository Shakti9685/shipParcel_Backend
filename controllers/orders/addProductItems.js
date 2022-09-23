const Order = require("../../models/Order.model");
const User = require("../../models/User.model");
const Category = require("../../models/Category.model");
const Product = require("../../models/Product.model");
const Payment = require("../../models/Payment.model");
const Variant = require("../../models/Variant.model");
const createError = require("http-errors");
const { subtract } = require("lodash");
const { x } = require("joi");

const { ObjectId } = require("mongoose").Types;

const addProductItems = async (req, res, next) => {
  try {
    const { orderId, userId } = req.params;
    let subTotal = 0;

    const order = await Order.findOne({ _id: ObjectId(orderId) });
    const user = await User.findOne({ _id: ObjectId(userId) });
    const { productData } = req.body;

    if (!user) {
      return next(createError(400, "User not found"));
    }
    if (!order) {
      throw createError.BadRequest("Order not found");
    }

    subTotal = productData?.reduce((arr, curr) => {
      return +curr.price * curr.quantity + +arr;
    }, 0);

    const variants = await Promise.all(
      productData.map((item) => {
        const { variantId, quantity, sku } = item;

        return Variant.findOne({ sku: sku }).then((variant) => {
          variant.inventory = variant.inventory - quantity;
          return variant;
        });
      })
    );

    await Promise.all(
      variants.map(async (item) => {
        if (item.inventory < 0) {
          await Variant.findOne({ sku: item.sku }).then((res) => {
            throw createError.BadRequest(
              `You cannot add that amount of ${
                item.sku
              } to the cart because there is not enough stock ${Math.abs(
                res?.inventory
              )}  remaining`
            );
          });
        }
      })
    );

    variants.forEach(async (item) => {
      const { inventory, sku } = item;

      return await Variant.findOneAndUpdate(
        { sku: sku },
        { inventory: inventory },
        { new: true }
      );
    });
    let total = 0;
    let tax = 0;

    for (let x of productData) {
      if (
        order.address.state_code === "Connecticut CT" ||
        order.address.state_code === "Connecticut" ||
        order.address.state_code === "connecticut" ||
        order.address.state_code === "CT" ||
        order.address.state_code === "Connecticut (CT)"
      ) {
        const category = await Category.findOne({
          _id: x.category,
        });
        tax += (x.price * category.tax * x.quantity) / 100;
      } else {
        total = subTotal;
      }
    }
    const taxAmountValue = [];
    for (let x of productData) {
      const variant = await Variant.findOne({ sku: x.sku });
      if (
        order.address.state_code === "Connecticut CT" ||
        order.address.state_code === "Connecticut" ||
        order.address.state_code === "connecticut" ||
        order.address.state_code === "CT" ||
        order.address.state_code === "Connecticut (CT)"
      ) {
        const totalTax =
          !!variant.volume === false ? 0 : variant.volume * 0.4 * x.quantity;
        taxAmountValue.push(totalTax);
      }
    }

    const totalVolumeTaxAmount = taxAmountValue.reduce(
      (prev, curr) => prev + curr,
      0
    );

    total = order.total + subTotal + tax + totalVolumeTaxAmount;

    const updateOrder = await Order.findOneAndUpdate(
      {
        _id: ObjectId(orderId),
      },
      {
        productData: [...order.productData, ...productData],
        total: total,
        tax: (order.tax + tax)?.toFixed(2),
        subTotal: order.subTotal + subTotal,
        volumeTax: totalVolumeTaxAmount + order.volumeTax,
      },
      { new: true }
    );
    const paymentDetails = await Payment.findOne({
      orderId: ObjectId(orderId),
    });
    if (!!paymentDetails === true) {
      paymentDetails.totalAmount = updateOrder.total;

      paymentDetails.payableAmount = (
        paymentDetails.totalAmount - paymentDetails.partiallyPaidAmount
      )?.toFixed(2);
      await paymentDetails.save();
    }
    await Promise.all(
      productData.map(async (item) => {
        const { productId } = item;

        return await Product.findOneAndUpdate(
          { _id: productId },
          { $inc: { buyCount: 1 } },
          { new: true }
        );
      })
    );
    res.json({
      success: true,
      status: 200,
      message: "Order updated successfully",
      updateOrder,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = addProductItems;
