const createError = require("http-errors");
const Order = require("../../models/Order.model");

const User = require("../../models/User.model");
const Variant = require("../../models/Variant.model");
const CartItem = require("../../models/CartItem.model");
const Product = require("../../models/Product.model");
const Cart = require("../../models/Cart.model");
const { ObjectId } = require("mongoose").Types;

const Category = require("../../models/Category.model");
const { orderValidation } = require("../../services/validation_schema");

const createOrders = async (req, res, next) => {
  try {
    const result = await orderValidation.validateAsync(req.body);
    const { id } = req.params;
    const user = await User.findOne({ _id: ObjectId(id) });
    if (!user) {
      return next(createError(400, "User not found"));
    }
    const {
      productData,
      address,
      type,
      paymentmethod,
      taxValue,
      subTotalValue,
    } = result;

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

    // const categoryData = await Promise.all(
    //   productData.map(async (item) => {
    //     const { variantId, quantity, sku, category } = item;
    //     return Category.findOne({ _id: category }).then((category) => {
    //       return category;
    //     });
    //   })
    // );
    // console.log(productData);
    let total = 0;
    let tax = 0;
    productData.map(async (item) => {
      if (
        address.state_code === "Connecticut CT" ||
        address.state_code === "Connecticut" ||
        address.state_code === "connecticut" ||
        address.state_code === "CT" ||
        address.state_code === "Connecticut (CT)"
      ) {
        return (tax += (item.category.tax / 100) * item.quantity * item.price);
      }
    });

    total = subTotalValue + tax + taxValue;
    let volumeTax = 0;
    console.log(taxValue, "taxValue");
    if (taxValue > 0) {
      volumeTax = taxValue;
    }

    const order = new Order({
      productData: productData,
      user: user._id,
      address,
      total,
      tax: tax.toFixed(2),
      subTotal: subTotalValue,
      volumeTax,
      type,
      paymentmethod,
    });
    const lastOrder = await Order.findOne({}).sort({ orderId: -1 }).limit(1);

    const getOrderCount = +lastOrder.orderId.match(/\d/g).join("") + 1;

    order.orderId = `OHM${getOrderCount}`;
    await order.save();
    if (type === "online") {
      for (x of productData) {
        const deletedProduct = await CartItem.findOneAndDelete({
          _id: ObjectId(x.uniqueId),
        });

        await Cart.findOneAndUpdate(
          { $and: [{ user: ObjectId(user._id) }, { _id: ObjectId(x.cartId) }] },
          { $pull: { items: ObjectId(deletedProduct?._id) } },
          { new: true }
        );
      }
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
      message: "Order created successfully",
      order,
      user: req.user,
    });
  } catch (error) {
    console.error(error);
    return next(error);
  }
};

module.exports = createOrders;
