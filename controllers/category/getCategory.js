const createError = require("http-errors");
const Category = require("../../models/Category.model");
const getCategory = async (req, res, next) => {
  const startIndex = parseInt(req.query.startIndex) || 0;
  const viewSize = parseInt(req.query.viewSize) || 10;
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
      {
        $facet: {
          count: [
            {
              $count: "total",
            },
          ],

          data: [
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
        },
      },
    ]);

    res.json({
      success: true,
      message: "Category fetched successfully",
      categoryData: category[0]?.data,
      totalCount: category[0]?.count[0]?.total,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getCategory;
