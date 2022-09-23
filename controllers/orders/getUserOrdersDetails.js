const Order = require("../../models/Order.model");
const User = require("../../models/User.model");
const { ObjectId } = require("mongoose").Types;

const getUserOrdersDetails = async (req, res, next) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const viewSize = parseInt(req.query.viewSize) || 10;
    const { id } = req.params;
    const searchCriteria = {};
    if (req.query.keyword) {
      searchCriteria["$and"] = [
        {
          orderId: { $regex: `^${req.query.keyword.trim()}`, $options: "i" },
        },
      ];
    }
    const count = await Order.countDocuments({ user: ObjectId(id) });
    const usersOrder = await Order.aggregate([
      {
        $match: { ...searchCriteria, user: ObjectId(id) },
      },

      {
        $unwind: {
          path: "$productData",
          preserveNullAndEmptyArrays: true,
        },
      },

      {
        $lookup: {
          from: "products",
          let: { prodId: "$productData.productId" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$_id", "$$prodId"],
                },
              },
            },
            {
              $lookup: {
                from: "categories",
                localField: "category",
                foreignField: "_id",
                as: "category",
              },
            },
            {
              $unwind: {
                path: "$category",
              },
            },
          ],
          as: "productData.product",
        },
      },
      {
        $unwind: {
          path: "$productData.product",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: "variants",
          localField: "productData.sku",
          foreignField: "sku",
          as: "productData.variants",
        },
      },
      {
        $unwind: {
          path: "$productData.variants",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: { path: "$user" },
      },
      {
        $lookup: {
          from: "payment",
          let: { id: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [{ $eq: ["$orderId", "$$id"] }],
                },
              },
            },
            {
              $lookup: {
                from: "transaction",
                let: { id: "$_id" },
                pipeline: [
                  {
                    $match: {
                      $expr: {
                        $and: [{ $eq: ["$paymentId", "$$id"] }],
                      },
                    },
                  },
                ],
                as: "transactionRecord",
              },
            },
          ],
          as: "paymentDetails",
        },
      },
      {
        $unwind: {
          path: "$paymentDetails",
          preserveNullAndEmptyArrays: true,
        },
      },

      {
        $group: {
          _id: "$_id",
          orderId: {
            $first: "$orderId",
          },
          paymentDetails: {
            $first: "$paymentDetails",
          },
          user: {
            $first: "$user",
          },
          address: {
            $first: "$address",
          },
          shippingFee: {
            $first: "$shippingFee",
          },
          productData: {
            $push: "$productData",
          },
          paymentmethod: {
            $first: "$paymentmethod",
          },
          total: {
            $first: "$total",
          },
          tax: {
            $first: "$tax",
          },
          subTotal: {
            $first: "$subTotal",
          },
          type: {
            $first: "$type",
          },
          status: {
            $first: "$status",
          },
          createdAt: {
            $first: "$createdAt",
          },

          updatedAt: {
            $first: "$updatedAt",
          },
        },
      },

      {
        $project: {
          _id: 1,
          orderId: 1,
          status: 1,
          subTotal: 1,
          tax: 1,
          productData: 1,
          paymentDetails: 1,
          shippingFee: 1,
          type: 1,
          paymentmethod: 1,
          notes: 1,
          createdAt: 1,
          updatedAt: 1,
          user: {
            _id: 1,
            isVerified: 1,
            role: 1,

            firstName: 1,
            lastName: 1,
            phone: 1,
            email: 1,
            companyName: 1,
            userName: 1,
            resaleCertificate: 1,
            einCertificate: 1,
            address: 1,
            __v: 1,
          },
          address: 1,
          total: 1,
          createdAt: 1,
          updatedAt: 1,
          __v: 1,
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
      {
        $skip: startIndex,
      },
      {
        $limit: viewSize,
      },
    ]);
    if (!usersOrder) {
      throw new Error("No Orders availbale for this User");
    }

    res.json({
      success: true,
      status: 200,
      message: "Order fetched successfully",
      usersOrder: usersOrder,
      totalCount: count,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getUserOrdersDetails;
