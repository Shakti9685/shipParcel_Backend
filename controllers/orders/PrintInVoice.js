const Order = require("../../models/Order.model");
const sendEmail = require("../../services/sendEmail");
const InVoicePrint = require("../../template/InVoicePrint");

const { ObjectId } = require("mongoose").Types;

const PrintInvoice = async (req, res, next) => {
  try {
    const { id } = req.params;
    const order = await Order.aggregate([
      {
        $match: {
          _id: ObjectId(id),
        },
      },
      {
        $unwind: "$productData",
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
        $unwind: "$productData.product",
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
        $unwind: "$productData.variants",
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
    ]);

    await sendEmail.sendEmail(
      ["areeb.safvi@simbaquartz.com"],
      `InVoice`,
      InVoicePrint(order[0])
    );
    res.status(200).json({
      message: "Prospect User created successfully",
      order,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = PrintInvoice;
