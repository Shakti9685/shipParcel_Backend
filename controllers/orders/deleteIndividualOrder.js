const Order = require("../../models/Order.model");
const Category = require("../../models/Category.model");
const Variant = require("../../models/Variant.model");
const Payment = require("../../models/Payment.model");
const { ObjectId } = require("mongoose").Types;

const deleteIndividualOrder = async (req, res, next) => {
  try {
    const { individualOrderedProductId, address } = req.body;
    console.log(address);
    const { id } = req.params;
    const order = await Order.findOne({ _id: ObjectId(id) });

    if (!order) {
      throw new Error("Order not found");
    }
    console.log(order);
    const variant = await Promise.all(
      order.productData.map(async (item) => {
        if (item._id == individualOrderedProductId) {
          return await Variant.findOne({ sku: item.sku }).then((res) => {
            res.inventory = res.inventory + item.quantity;
            return res;
          });
        } else {
          return await Variant.findOne({ sku: item.sku }).then((res) => {
            return res;
          });
        }
      })
    );
    variant.forEach(async (item) => {
      const { inventory, sku } = item;

      return await Variant.findOneAndUpdate(
        { sku: sku },
        { inventory: inventory },
        { new: true }
      );
    });
    let totalVolumeTax = [];

    await Promise.all(
      order.productData.map(async (item) => {
        const variants = await Variant.findOne({ sku: item.sku });
        if (
          address?.state_code === "Connecticut" ||
          address?.state_code === "Connecticut CT" ||
          address?.state_code === "connecticut" ||
          address?.state_code === "CT" ||
          address?.state_code === "Connecticut (CT)"
        ) {
          if (!!variants.volume === true) {
            if (item._id == individualOrderedProductId) {
              return totalVolumeTax.push(
                !!variants.volume === false
                  ? 0
                  : +(variants.volume * 0.4 * 0)?.toFixed(2)
              );
            }
            return totalVolumeTax.push(
              !!variants.volume === false
                ? 0
                : +(variants.volume * 0.4 * item?.quantity)?.toFixed(2)
            );
          }
        }
      })
    );
    await Promise.all(
      order.productData.map(async (item) => {
        if (item._id == individualOrderedProductId) {
          return await Category.findOne({
            _id: ObjectId(item.category),
          }).then((res) => {
            if (
              address.state_code === "Connecticut CT" ||
              address.state_code === "Connecticut" ||
              address.state_code === "connecticut" ||
              address.state_code === "CT" ||
              address.state_code === "Connecticut (CT)"
            ) {
              const data = (res.tax / 100) * item.quantity * item.price;

              return (order.tax -= data);
            } else {
              order.tax = 0;
            }
          });
        }
      })
    );

    order.tax = order.tax.toFixed(2);
    const updatedOrder = order.productData.filter(
      (item) => item._id.toString() !== individualOrderedProductId
    );
    order.productData = updatedOrder;

    const orderPrice = order.productData.reduce(
      (prev, curr) => prev + curr.price * curr.quantity,
      0
    );
    if (order.productData.length === 0) {
      order.tax = 0;
      order.total = 0;
      order.subtotal = 0;
      order.shippingFee = 0;
      order.volumeTax = 0;
    }

    order.subTotal = orderPrice;

    const totalVolumeTaxAmount = totalVolumeTax.reduce(
      (prev, curr) => prev + curr,
      0
    );
    order.volumeTax = totalVolumeTaxAmount;

    order.total = orderPrice + order.tax + totalVolumeTaxAmount;
    const paymentDetails = await Payment.findOne({ orderId: ObjectId(id) });
    if (!!paymentDetails === true) {
      paymentDetails.totalAmount = order.total;

      paymentDetails.payableAmount = (
        paymentDetails.totalAmount - paymentDetails.partiallyPaidAmount
      )?.toFixed(2);
      await paymentDetails.save();
    }

    await order.save();
    res.json({
      success: true,
      status: 200,
      message: "Order deleted successfully",
      message2: "",
      order,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = deleteIndividualOrder;
