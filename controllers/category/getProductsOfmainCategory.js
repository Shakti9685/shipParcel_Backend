const createError = require("http-errors");
const { ObjectId } = require("mongoose").Types;
const Category = require("../../models/Category.model");
const getSingleSubCategoryProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    const category = await Category.aggregate([
      {
        $match: {
          _id: ObjectId(id),
        },
      },
      {
        $lookup: {
          from: "categories",
          localField: "_id",
          foreignField: "parent",
          as: "subCategory",
        },
      },

      {
        $lookup: {
          from: "products",
          let: { category: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    {
                      $eq: ["$category", "$$category"],
                    },
                  ],
                },
              },
            },
            {
              $lookup: {
                from: "variants",
                localField: "_id",
                foreignField: "productId",
                as: "variants",
              },
            },
          ],

          as: "product",
        },
      },
    ]);

    if (!category) {
      throw createError(404, "subCategory not found");
    }
    return res.send({
      success: true,
      category: category[0],
    });
  } catch (err) {
    next(err);
  }
};

module.exports = getSingleSubCategoryProduct;
