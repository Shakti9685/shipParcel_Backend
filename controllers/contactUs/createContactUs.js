const createError = require("http-errors");
const ContactUs = require("../../models/ContactUs.model");
const { contactUsValidation } = require("../../services/validation_schema");

const createContactUs = async (req, res, next) => {
  try {
    const result = await contactUsValidation.validateAsync(req.body);
    const { firstName, lastName, email, phone, description } = result;

    const contactUs = new ContactUs({
      firstName,
      lastName,
      email,
      phone,
      description,
    });
    await contactUs.save();
    res.json({
      success: true,
      message: "Request send successfully",
      data: contactUs,
    });
  } catch (error) {

    next(error);
  }
};

module.exports = createContactUs;
