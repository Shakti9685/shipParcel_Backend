const createError = require("http-errors");
const ContactUs = require("../../models/ContactUs.model");
const deleteContactUs = async (req, res, next) => {
  try {
    const { id } = req.params;
    const contactUs = await ContactUs.findOne({ _id: id });
    if (!contactUs) {
      throw createError(404, "ContactUs not found");
    }
    await ContactUs.remove();

    res.json({
      success: true,
      message: "ContactUs deleted successfully",
    });
  } catch (error) {
   
    next(error);
  }
};

module.exports = deleteContactUs;
