const createError = require("http-errors");
const AddressModel = require("../../../models/Address.model");
const { updateContactValidation } = require("../../../services/validation_schema");


const updateContactsById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
     
    const result = await updateContactValidation.validateAsync(req.body);

    const contacts = await AddressModel.findOne({ _id: contactId });
    if (!contacts) {
      throw createError(404, "Contact not found");
    }
    const updateContacts = await AddressModel.findOneAndUpdate(
      { _id: contactId },result,
      { new: true }
    );
    await updateContacts.save();
    res.json({
      success: true,
      message: "Contact updated successfully",
      data: updateContacts,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateContactsById;