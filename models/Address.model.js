
const { Schema, model } = require("mongoose");

const UserAddressSchema = new Schema(
  {
    email: {
      type: String,
      lowercase: true,
      required: true,
      unique: true,
    },
    phone:{
      type:String,
      required:true,
      trim:true
    },
    contactName:{
      type:String,
      // required:true,
      trim:true
    },
    company:{
      type:String,
      required:true,
      trim:true
    },
    address: {
      country: {
        type:String,
        trim:true,
        default:"Canada"
      },
      province:{
        type: String,
        required:true,
        trim:true
      },
      address_line_1:{
       type:String,
       trim :true
      },
      address_line_2:{
        type:String,
        trim :true
       },
      city: {
       type: String,
        required:true,
        trim:true
      },
      postal_code: {
        type: String,
        trim:true
      }
    },

  },
  {
    timestamps: true,
  }
);

const Address = model("Address", UserAddressSchema, "addresses");

// make this available to our users in our Node applications
module.exports = Address;
