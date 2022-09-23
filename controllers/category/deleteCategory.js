const createError = require("http-errors");
const Category = require("../../models/Category.model");
const deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params;

    const categories = await Category.find({
      $or: [{ parent: id }, { _id: id }],
    });
    if (categories) {
      categories.forEach(async (item) => {
        await Category.findOneAndDelete({
          $or: [{ _id: id }, { parent: id }],
        });
      });
    }

    res.json({
      success: true,
      status: 200,
      message: "Category deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = deleteCategory;
