const createError = require("http-errors");
const Category = require("../../models/Category.model");
const { categoryValidation } = require("../../services/validation_schema");
const uploadFiles = require("../../services/upload-files");
const formidable = require("formidable");
const createCategory = async (req, res, next) => {
  const form = new formidable.IncomingForm();

  form.parse(req, async (err, fields) => {
    if (err) {
      next(err);
    }
    console.log(fields);

    try {
      const result = await categoryValidation.validateAsync(fields);
      console.log(result);
      const { name, parent, tax } = result;
      const subCategroyname = await Category.findOne({
        name: name,
      });
      if (subCategroyname) {
        throw new Error("Already Exist");
      }

      const category = new Category({
        name,
        parent,
        tax,
      });

      await category.save();
      res.json({
        success: true,
        status: 200,
        message: "Category created successfully",
        data: category,
      });
    } catch (error) {
      next(error);
    }
  });
};

module.exports = createCategory;
