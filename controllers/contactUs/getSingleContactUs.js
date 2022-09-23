const createError = require("http-errors");
const ContactUs = require("../../models/ContactUs.model");
const { ObjectId } = require("mongoose").Types;
const updateContactUs = async (req, res, next) => {
  try {
    const { id } = req.params;
    // const contactUs = await ContactUs.findOne({ _id: id });
    const contactUs = await ContactUs.aggregate([
      {
        $match: {
          _id: id,
        },
      },
    ]);
    if (!contactUs) {
      throw createError(404, "ContactUs not found");
    }
    res.json({
      success: true,
      message: "ContactUs fetched successfully",
      data: contactUs[0],
    });
    1;
  } catch (error) {
    next(error);
  }
};

module.exports = updateContactUs;
