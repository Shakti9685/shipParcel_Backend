const Order = require("../../models/Order.model");
const Category = require("../../models/Category.model");
const Variant = require("../../models/Variant.model");
const CartItem = require("../../models/CartItem.model");
const Payment = require("../../models/Payment.model");
const createError = require("http-errors");

const { ObjectId } = require("mongoose").Types;

const updateIndividualOrder = async (req, res, next) => {
  try {
    const { quantity, individualOrderedProductId, address } = req.body;
    const { id } = req.params;

    const order = await Order.findOne({ _id: ObjectId(id) });

    if (!order) {
      throw new Error("Order not found");
    }

    const variants = await Promise.all(
      order.productData.map(async (item) => {
        if (item._id == individualOrderedProductId) {
          if (quantity >= item.quantity) {
            let increaseInventory = quantity - item.quantity;
            return await Variant.findOne({ sku: item.sku }).then((variant) => {
              variant.inventory = variant.inventory - increaseInventory;
              return variant;
            });
          } else if (quantity < item.quantity) {
            let decreasedInventory = item.quantity - quantity;

            return await Variant.findOne({ sku: item.sku }).then((variant) => {
              variant.inventory = variant.inventory + decreasedInventory;
              return variant;
            });
          }
        } else {
          return await Variant.findOne({ sku: item.sku }).then((variant) => {
            return variant;
          });
        }
      })
    );

    await Promise.all(
      order.productData.map(async (item) => {
        if (item._id == individualOrderedProductId) {
          if (quantity >= item.quantity) {
            let increaseInventory = quantity - item.quantity;

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
                const data = (res.tax / 100) * increaseInventory * item.price;

                return (order.tax += data);
              }
            });
          } else if (quantity < item.quantity) {
            let decreasedInventory = item.quantity - quantity;

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
                const data = (res.tax / 100) * decreasedInventory * item.price;

                return (order.tax -= data);
              }
            });
          }
        }
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
    const updatedOrder = order.productData.map((item) => {
      if (item._id == individualOrderedProductId) {
        return {
          ...item._doc,
          quantity: quantity,
        };
      }
      return item;
    });
    order.productData = updatedOrder;

    order.tax = order.tax.toFixed(2);
    const orderPrice = order.productData.reduce(
      (prev, curr) => prev + curr.price * curr.quantity,
      0
    );

    order.subTotal = orderPrice;

    let totalVolumeTax = [];

    await Promise.all(
      order.productData.map(async (item) => {
        const variants = await Variant.findOne({ sku: item.sku });

        if (item._id == individualOrderedProductId) {
          if (
            address?.state_code === "Connecticut" ||
            address?.state_code === "Connecticut CT" ||
            address?.state_code === "connecticut" ||
            address?.state_code === "CT" ||
            address?.state_code === "Connecticut (CT)"
          ) {
            return totalVolumeTax.push(
              !!variants.volume === false
                ? 0
                : +(variants.volume * 0.4 * quantity)?.toFixed(2)
            );
          }
          return totalVolumeTax[0];
        }
        return totalVolumeTax.push(
          !!variants.volume === false
            ? 0
            : +(variants.volume * 0.4 * item.quantity)?.toFixed(2)
        );
      })
    );
    console.log(totalVolumeTax, "totalVolumeTax");
    const totalVolumeTaxAmount = totalVolumeTax.reduce(
      (prev, curr) => prev + curr,
      0
    );
    order.volumeTax = totalVolumeTaxAmount;
    order.total = orderPrice + order.tax + totalVolumeTaxAmount;

    await order.save();

    const paymentDetails = await Payment.findOne({ orderId: ObjectId(id) });
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
      // order,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateIndividualOrder;
