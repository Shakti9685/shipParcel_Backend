const createError = require("http-errors");
const Order = require("../../models/Order.model");
const User = require("../../models/User.model");
const Variant = require("../../models/Variant.model");
const { ObjectId } = require("mongoose").Types;

const deleteOrder = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ _id: ObjectId(id) });

    if (!user) {
      throw createError.BadRequest("user not found");
    }
    let data = [];
    const { deleteOrderData } = req.body;

    deleteOrderData.map(async (item) => {
      const isFound = item.productData.some((element) => {
        if (element._id) {
          return true;
        }

        return false;
      });

      console.log(isFound);

      if (!isFound) {
        return await Order.findOneAndDelete({ _id: ObjectId(item._id) });
      } else if (isFound) {
        await Promise.all(
          deleteOrderData.map(async (order) => {
            if (order.paymentDetails === null) {
              return order.productData.map((i) => {
                return data.push(i);
              });
            } else if (
              !!order.paymentDetails === true &&
              order.paymentDetails.status !== "paid"
            ) {
              return order.productData.map((i) => data.push(i));
            }
          })
        );

        console.log(data);

        for (let x in data) {
          await Variant.findOne({
            _id: ObjectId(data[x].variants._id),
          }).then(async (res) => {
            res.inventory = res.inventory + data[x].quantity;
            return await res.save();
          });
        }
      }
    });

    await Promise.all(
      deleteOrderData.map(async (order) => {
        return await Order.findOneAndDelete({
          _id: ObjectId(order._id),
        });
      })
    );

    res.status(200).json({
      message: "Orders deleted successfully",
      success: true,
    });
  } catch (error) {
    console.log("error: ", error);
    next(error);
  }
};

module.exports = deleteOrder;
