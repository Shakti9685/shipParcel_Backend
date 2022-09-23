const shipMentModal = require("../../models/shipmentModel");
const jwt = require("jsonwebtoken");
const { accessSecret, refreshSecret, accessTokenLife, refreshTokenLife } =
  require("../../config/keys").jwt;
  var mongoose = require('mongoose'); 

const createError = require("http-errors");
const { createHistoryValidation } = require("../../services/validation_schema");


const getHistory = async (req, res, next) => {
  try {
    const { query } = req;

    if (!req.headers["authorization"])
      return next(createError.Unauthorized("Request is missing mandatory Header"));

    const token = req.headers["authorization"];
    const decodedToken = jwt.verify(token, accessSecret);
    const userId = mongoose.Types.ObjectId(decodedToken.userId);

    
    const currentPage = (query._Page && parseInt(query._Page)) || 1;
    const viewSize = (query._limit && parseInt(query._limit)) || 10;

    // //Skipping documents according to pages 
    let skipDocuments = 0;
    if (currentPage != 1) skipDocuments = (currentPage - 1) * viewSize;


    const allOrders = await shipMentModal.aggregate([
      { $match: {userId} },
      { $skip: skipDocuments },
      { $limit: parseInt(viewSize) },
      { $sort: { created_at: -1 } },

      {
        $project: {
           shipping_date:"$createdAt",
           orderId:"$_id",
           status:1,
           weight:"$packageDetail.weight"
        },
      },
    ]);

    const count = await shipMentModal.countDocuments({
      userId:userId
    });

    res.send({status:"Success",data:allOrders,totalDocument:count,currentPageDocuments:allOrders.length})

  }
  catch (error) {
    next(error);
  }
}


module.exports = getHistory;