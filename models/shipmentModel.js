const { Schema, model } = require("mongoose");

const shipmentSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    shipping_from: {
        company: {
            type: String,
            required: true,
            trim: true
        },
        address_line_1: {
            type: String,
            required: true,
            trim: true
        },
        address_line_2: {
            type: String,
            required: true,
            trim: true
        },
        country: {
            type: String,
            trim: true,
            default: "Canada"
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
        province: {
            type: String,
            required: true,
            trim: true
        },
        attention: {
            type: String,
            required: true,
            trim: true
        },
        phone: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            trim: true
        },
        instruction: {
            type: String,
            required: true,
            trim: true
        },
        saveToAddressBook: {
            type: Boolean,
            required: true
        }
    },
    shipping_to: {
        company: {
            type: String,
            required: true,
            trim: true
        },
        address_line_1: {
            type: String,
            required: true,
            trim: true
        },
        address_line_2: {
            type: String,
            required: true,
            trim: true
        },
        country: {
            type: String,
            trim: true,
            default: "Canada"
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
        province: {
            type: String,
            required: true,
            trim: true
        },
        attention: {
            type: String,
            required: true,
            trim: true
        },
        phone: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            trim: true
        },
        instruction: {
            type: String,
            required: true,
            trim: true
        },
        saveToAddressBook: {
            type: Boolean,
            required: true
        }
    },
    sendConfirmationMail: {
        type: Boolean,
        required: false
    },
    packageDetail:
    {
        packagingType: {
            type: String,
            enum: ["Pak", "Envelope", "My Packaging", "Pallet"]
        },
        quantity: {
            type: Number,
            min: 1,
            max: 50
        },

        requestedPackageLineItems: [{
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
                    type: Number,
                    required: false,
                    trim: true
                },
                units: {
                    type: Number,
                    required: false,
                    trim: true
                }
            },
            insuranceValue: {
                type: String,
                trim: true,
                required: false
            },
            weight: {
                units: {
                    type: String,
                    trim: true,
                    required: false
                },
                value: {
                    type: String,
                    trim: true,
                    required: false
                }
            },
            specialHandling: {
                type: String,
                trim: true,
                required: false,
                enum: ["Yes","No"]
            },
            description: {
                type: String,
                trim: true,
                required: false
            }
        }]


    }

    ,
    additionalServices: {
        schedulePickUp: {
            pickUpDate: {
                type: String,
                trim: true,
                required: false
            },
            earliestTimeReady: {
                type: String,
                trim: true,
                required: false
            },
            latestTiimeReady: {
                type: String,
                trim: true,
                required: false
            },
            pickUpLocation: {
                type: String,
                trim: true,
                required: false
            },
            instruction: {
                type: String,
                trim: true,
                required: false
            }
        }
    },
    DropOffAtCarrier: {
        shipDate: {
            type: String,
            trim: true,
            required: false
        }
    },
    status: {
        type: String,
        default: "Ready to Process"
    }
}, { timestamps: true })

const shipMent = model("shipMent", shipmentSchema, "shipMent");

module.exports = shipMent;