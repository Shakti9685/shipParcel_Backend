const createError = require("http-errors");
const Category = require("../../models/Category.model");
const getAllCategory = async (req, res, next) => {
  const searchCriteria = {};

  if (req.query.keyword) {
    searchCriteria["$or"] = [
      {
        name: { $regex: `^${req.query.keyword.trim()}`, $options: "i" },
      },
    ];
  }

  try {
    const category = await Category.aggregate([
      {
        $match: {
          ...searchCriteria,
          parent: undefined,
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
    ]);

    res.json({
      success: true,
      message: "Category fetched successfully",
      categoryData: category,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getAllCategory;
