const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
email: {
  type: String,
  lowercase: true,
  required: true,
  unique: true,
},
userName:{
  type:String,
  required:true,
  trim:true
},
password:{
  type:String,
  required:true,
  trim:true
},
accountType:{
type:String,
enum: ["Business", "admin"] ,
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
  city: {
   type: String,
    required:true,
    trim:true
  },
  address: {
    type: String,
    required:true,
    trim:true
  },
  postalCode: {
    type: String,
    trim:true
  },
  apt:{
    type:String,
    trim:true
  },
},
businessName:{
  type:String,
  required:true,
  trim:true
},
contactName:{
  type:String,
  required:true,
  trim:true
},
phone:{
  type:String,
  required:true,
  trim:true
},
referral:{
  type:String,
  trim:true
},
termsAndConditions:{
type:Boolean,
trim:true
},
newsUpdates:{
  type:Boolean,
trim:true
}
});

module.exports = model("User", UserSchema, "users");
