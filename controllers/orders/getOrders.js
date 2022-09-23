const Order = require("../../models/Order.model");
const getOrders = async (req, res, next) => {
  const startIndex = parseInt(req.query.startIndex) || 0;
  const viewSize = parseInt(req.query.viewSize) || 10;
  const searchCriteria = {};

  if (req.query.status) {
    searchCriteria["$and"] = [
      {
        status: req.query.status,
      },
    ];
  }

  if (req.query.type) {
    searchCriteria["$and"] = [
      {
        type: req.query.type,
      },
    ];
  }

  if (req.query.keyword) {
    searchCriteria["$or"] = [
      {
        orderId: {
          $regex: req.query.keyword.trim(),
          $options: "i",
        },
      },
      {
        "user.companyName": {
          $regex: req.query.keyword.trim(),
          $options: "i",
        },
      },

      {
        name: {
          $regex: req.query.keyword.trim(),
          $options: "i",
        },
      },
    ];
  }

  try {
    const order = await Order.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: { path: "$user", preserveNullAndEmptyArrays: true },
      },

      {
        $facet: {
          data: [
            // {
            //   $unwind: {
            //     path: "$productData",
            //     preserveNullAndEmptyArrays: true,
            //   },
            // },

            // {
            //   $lookup: {
            //     from: "products",
            //     localField: "productData.productId",
            //     foreignField: "_id",
            //     as: "productData.product",
            //   },
            // },
            // {
            //   $unwind: {
            //     path: "$productData.product",
            //     preserveNullAndEmptyArrays: true,
            //   },
            // },
            // {
            //   $lookup: {
            //     from: "variants",
            //     localField: "productData.sku",
            //     foreignField: "sku",
            //     as: "productData.variants",
            //   },
            // },

            // {
            //   $unwind: {
            //     path: "$productData.variants",
            //     preserveNullAndEmptyArrays: true,
            //   },
            // },
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
                shippingFee: {
                  $first: "$shippingFee",
                },
                paymentmethod: {
                  $first: "$paymentmethod",
                },
                user: {
                  $first: "$user",
                },
                address: {
                  $first: "$address",
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
                volumeTax: {
                  $first: "$volumeTax",
                },
                productData: {
                  $push: "$productData",
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
                // productData: 1,
                shippingFee: 1,
                paymentmethod: 1,
                paymentDetails: 1,
                notes: 1,
                tax: 1,
                createdAt: 1,
                updatedAt: 1,
                volumeTax: 1,
                type: 1,

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
                  zipCode: 1,
                  address: 1,
                  __v: 1,
                },
                name: { $concat: ["$user.firstName", " ", "$user.lastName"] },

                address: 1,
                total: 1,
                subTotal: 1,
                createdAt: 1,
                updatedAt: 1,
                __v: 1,
              },
            },
            {
              $match: searchCriteria,
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
          ],
          count: [
            {
              $count: "total",
            },
          ],
        },
      },
    ]);
    res.json({
      success: true,
      message: "orders fetched successfully",
      orderData: order[0]?.data,
      totalCount: order?.[0]?.count?.[0]?.total,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getOrders;
