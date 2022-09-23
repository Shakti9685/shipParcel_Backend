const { Schema, model } = require("mongoose");

const ParcelSchema = new Schema(
    {
        shipping_from: {
            country: {
                type: String,
                trim: true,
                default: "Canada"
            },
            province:{
                type: String,
                required: true,
                trim: true
            },
            postal_code: {
                type: String,

                trim: true
            },
            city: {
                type: String,
                required: true,
                trim: true
            },
        },
        shipping_to: {
            country: {
                type: String,
                trim: true,
                default: "Canada"
            },
            province:{
                type: String,
                required: true,
                trim: true
            },
            postal_code: {
                type: String,

                trim: true
            },
            city: {
                type: String,
                required: true,
                trim: true
            },
        },
        weight: {
            type: String,
            required: false,
            trim: true
        },
        dimension: {
            length: {
                type: Number,
                required: false,
                trim: true
            },
            breath: {
                type: Number,
                required: false,
                trim: true
            },
            height: {
                type:Number,
                required: false,
                trim: true
            }

        },
        incured_value: {
            type: String,
            trim: true,
            required: false
        }
    }
)

module.exports = model("Parcel", ParcelSchema, "parcel");