const createError = require("http-errors");
const Category = require("../../models/Category.model");
const updateCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, tax } = req.body;
    const category = await Category.findOne({ _id: id });
    if (!category) {
      throw createError(404, "Category not found");
    }
    const updateCategory = await Category.findOneAndUpdate(
      { _id: id },
      {
        name: name,
        tax: tax,
      },
      { new: true }
    );
    await updateCategory.save();
    res.json({
      success: true,
      message: "Category updated successfully",
      data: updateCategory,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateCategory;
