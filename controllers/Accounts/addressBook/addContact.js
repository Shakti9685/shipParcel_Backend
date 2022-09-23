const AddressModel = require("../../../models/Address.model");

const createError = require("http-errors");
const { createContactValidation } = require("../../../services/validation_schema");


const createContact = async (req, res, next) => {
    try {
        const result = await createContactValidation.validateAsync(req.body);
      
      let data= await AddressModel.create(req.body);

      if (!data)
      res.status(400).send({status:false, message: "Your request could not be processed. Please contact support or try again after some time." }); 
      
      res.status(201).json({
        success: true,
        quote:data,
      });

    }
    catch (error){
        next(error);
    }
}


module.exports = createContact;