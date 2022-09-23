const ParcelModel = require("../../models/ParcelModel");

const createError = require("http-errors");
const { createQuoteValidation } = require("../../services/validation_schema");


const createQuotes = async (req, res, next) => {
    //try {
      if (!req.body.quoteType) {
        res.status(400).send({status:false, message: "QuoteType is required "})
    }
   
        const result = await createQuoteValidation.validateAsync(req.body);
      

       if(req.body.shipping_from.postal_code==req.body.shipping_to.postal_code){
        res.status(400).send({status:false, message: "Postal code should not be same for the source and the destination"})
       }
      let data= await ParcelModel.create(result)

      if (!data)
      res.status(400).send({status:false, message: "Your request could not be processed. Please contact support or try again after some time." })
      ;  
      
      res.status(201).json({
        success: true,
        quote:data,
      });

    // }
    // catch (error){
    //     next(error);
    // }
}


module.exports = createQuotes;



