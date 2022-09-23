const createError = require("http-errors");
const Category = require("../../models/Category.model");
const { ObjectId } = require("mongoose").Types;

const getSingleSubCategoryProductDetails = async (req, res, next) => {
  try {
    const { subId } = req.params;
    if (!ObjectId.isValid(subId)) {
      return next(createError(400, "Invalid category id"));
    }
    const category = await Category.findOne({ _id: ObjectId(subId) });
    if (!category) {
      return next(createError(404, "Category not found"));
    }
    const products = await Category.aggregate([
      {
        $match: { _id: ObjectId(subId) },
      },

      {
        $lookup: {
          from: "products",
          let: { subCategory: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [{ $eq: ["$subCategory", "$$subCategory"] }],
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
          as: "productDetails",
        },
      },
    ]);
    res.status(200).json({
      success: true,
      message: "Category products fetched successfully",
      products: products,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = getSingleSubCategoryProductDetails;
