const { Schema, model } = require("mongoose");

const historySchema = new Schema({
    timePeriod: {
        start: {
            type: String,
            required: true,
            trim: true
        },
        end: {
            type: String,
            required: true,
            trim: true
        }
    },
    orderStatus: {
        type: String,
        enum: [
            "Ready for Shipping",
            "Intransit",
            "Delievered",
            "Cancelled",
            "Exception",
            "Predispatched",
            "Closed",
            "Ready to Process",
            "Sent to Warehouse",
            "Recieved by Warehouse",
            "Ship",
            "Cancel Pending",
            "Cancel Approved"
        ]
    },
    tracking: {
        type: String,
        required: true,
        trim: true
    },
    refrence: {
        type: String,
        required: false,
        trim: true
    },
    carrier:{
        type: String,
        required: true,
        trim: true  
    },
    shipFrom:{
        type: String,
        required: true,
        trim: true 
    },
    //shippedTo:{},
    //cartOrederId:{},
    cancelShipmentIncluded:{
        type:Boolean,
        required:false
    }
});

module.exports = model("shipmentHistory", historySchema, "shipmentHistory");