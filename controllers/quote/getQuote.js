const axios= require("axios")
var querystring = require('querystring');


const getQuotes = async (req,res,next)=>{

    try{
        console.log(req.headers.Authorization)
        let response =await axios.post("https://apis-sandbox.fedex.com/rate/v1/rates/quotes",
        req.body, {
          headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${req.headers.Authorization}`
          }
        }).then(function(response) {
         res.status(200).send({ message: response.data})
        });
    }
    catch(err){
        res.status(500).send(err.message)
    }

}



module.exports=getQuotes