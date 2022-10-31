const axios= require("axios")
var querystring = require('querystring');


const generateShippingLabel = async (req,res,next)=>{

    try{
        // console.log(req.headers.Authorization);
        req.body.accountNumber= {
          "value": "740561073"
      }
      //console.log(req.body)
        let response =await axios.post("https://apis-sandbox.fedex.com/ship/v1/shipments",
        req.body, {
          headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${req.headers.Authorization}`
          }
        }).then(function(response) {
         // console.log(response.data.output)
         res.status(200).send({ message: response.data})
        });
    }
    catch(err){
        res.status(500).send(err.message)
    }

}



module.exports=generateShippingLabel