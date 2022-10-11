const Joi = require("joi");

const registerValidation = Joi.object({
  email: Joi.string().email().required(),
  userName: Joi.string().required(),
  password: Joi.string().required().min(3).max(50).required(),
  confirmPassword: Joi.string().allow("").min(3).max(50).required(),
  accountType:Joi.string().valid("Personal", "Business").required(),
  address: Joi.object({
    country:Joi.string().required(),
    state: Joi.string().required(),
    city: Joi.string().required(),
    address: Joi.string().required(),
    postalCode: Joi.string(),
    apt:Joi.string(),
  }),
  businessName: Joi.string().required(),
  contactName: Joi.string().required(),
  phone: Joi.string().required(),
  termsAndConditions:Joi.boolean(),
  newsUpdates:Joi.boolean(),
});

const createContactValidation=Joi.object({
  email: Joi.string().email().required(),
  phone:Joi.string().required(),
  contactName:Joi.string(),
  company:Joi.string().required(),
  address: Joi.object({
    country: Joi.string().required(),
    province: Joi.string().required(),
    city: Joi.string().required(),
    address_line_1: Joi.string(),
    address_line_2: Joi.string(),
    postal_code: Joi.string(),
  }),
})

const updateContactValidation=Joi.object({
  email: Joi.string().email(),
  phone:Joi.string(),
  contactName:Joi.string(),
  company:Joi.string(),
  address: Joi.object({
    country: Joi.string(),
    province: Joi.string(),
    city: Joi.string(),
    address_line_1: Joi.string(),
    address_line_2: Joi.string(),
    postal_code: Joi.string(),
  }),
})
const createQuoteValidation=Joi.object({
  quoteType:Joi.string().valid("PARCEL","PAK","ENVELOPE","LTL").required(),
  shipping_from: Joi.object({
    country: Joi.string().required(),
    province: Joi.string().required(),
    postal_code: Joi.string(),
    city: Joi.string().required(),
  }),
  shipping_to: Joi.object({
    country: Joi.string().required(),
    province: Joi.string().required(),
    postal_code: Joi.string(),
    city: Joi.string().required(),
  }),
  weight:Joi.string(),
  dimension: Joi.object({
    length:Joi.number(),
    breath:Joi.number(),
    height:Joi.number(),
  }),
  incured_value:Joi.string()
})


const createShipMentValidation = Joi.object({ 
  userId:Joi.string().required(),
  shipping_from:Joi.object({
    company: Joi.string().required(),
    address_line_1:Joi.string().required(),
    address_line_2:Joi.string().required(),
    country: Joi.string().required(),
    postal_code: Joi.string(),
    city: Joi.string().required(),
    province: Joi.string().required(),
    attention: Joi.string().required(),
    phone: Joi.string().required(),
    email:Joi.string().email().required(),
    instruction: Joi.string().required(),
    saveToAddressBook: Joi.boolean().required(),
  }),
  shipping_to:Joi.object({
    company: Joi.string().required(),
    address_line_1:Joi.string().required(),
    address_line_2:Joi.string().required(),
    country: Joi.string().required(),
    postal_code: Joi.string(),
    city: Joi.string().required(),
    province: Joi.string().required(),
    attention: Joi.string().required(),
    phone: Joi.string().required(),
    email:Joi.string().email().required(),
    instruction: Joi.string().required(),
    saveToAddressBook: Joi.boolean().required(),
  }),
  sendConfirmationMail: Joi.boolean().required(),
  packageDetail: Joi.object({
    packagingType:Joi.string().valid("Pak", "Envelope", "My Packaging", "Pallet").required(),
    quantity: Joi.number().min(1).max(50),
    dimension: Joi.object({
      length:Joi.number().required(),
      breath:Joi.number().required(),
      height:Joi.number().required(),
    }),
    weight: Joi.string(),
    specialHandling:Joi.string(),
    description:Joi.string(),
  }),
  incured_value:Joi.string(),
  additionalServices:  Joi.object({
    schedulePickUp:Joi.object({
      pickUpDate:Joi.string(),
      earliestTimeReady:Joi.string(),
      latestTiimeReady: Joi.string(),
      pickUpLocation:Joi.string(),
      instruction : Joi.string(),

    })
  }),
  DropOffAtCarrier:Joi.string(),


})

const updateProspectValidation = Joi.object({
  status: Joi.string().required(),
  rejectionCause: Joi.string().allow(""),
  role: Joi.string().allow(""),
});
const paymentValidation = Joi.object({
  totalAmount: Joi.number().required(),
  modeOfPayment: Joi.string().required(),
  paymentType: Joi.string().required(),
  partiallyPaidAmount: Joi.number().allow(""),
  dueDate: Joi.number().allow(""),
  chequeDate: Joi.date().allow(""),
  notes: Joi.string().allow(""),
});
const categoryValidation = Joi.object({
  name: Joi.string(),
  tax: Joi.number().allow(""),
  parent: Joi.string(),
});
const productValidation = Joi.object({
  name: Joi.string().required(),
  // price: {
  //   wholesaler_price: Joi.number().required(),
  //   retailer_price: Joi.number().required(),
  //   distributor_price: Joi.number().required(),
  //   myPrice: Joi.number().required(),
  // },
  description: Joi.string().required(),
  // shipping_details: {
  //   weight: Joi.number(),
  //   height: Joi.number(),
  //   width: Joi.number(),
  //   depth: Joi.number(),
  // },
  category: Joi.string().required(),
  subCategory: Joi.string().allow(""),

  // inventory: Joi.number().required(),
  // sku: Joi.string().required(),
  // attributesVal: Joi.string().required(),
  attributes: Joi.string().required(),
});

const orderValidation = Joi.object({
  productData: Joi.array().required(),
  paymentmethod: Joi.string().allow(""),
  totalValue: Joi.number().allow(""),
  taxValue: Joi.number().allow(""),
  subTotalValue: Joi.number().allow(""),
  type: Joi.string(),
  address: Joi.object({
    address_line_1: Joi.string(),
    address_line_2: Joi.string(),
    city: Joi.string(),
    country_code: Joi.string(),
    postal_code: Joi.string(),
    state_code: Joi.string(),
    state: Joi.string(),
  }),
});

const skuValidation = Joi.object({
  sku: Joi.string().required(),
  price: {
    wholesaler_price: Joi.number().required(),
    retailer_price: Joi.number().required(),
    distributor_price: Joi.number().required(),
    myPrice: Joi.number().required(),
  },
  attributesVal: Joi.string().required(),
  inventory: Joi.number().required(),
  barcode: Joi.string().required(),
  volume: Joi.allow(""),
});

const contactUsValidation = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  phone: Joi.string().required(),
  email: Joi.string().email().required(),
  description: Joi.string().required(),
});

const cartValidation = Joi.object({
  items: {
    productId: Joi.number().required(),
    quantity: Joi.number().required(),
  },
});

const wishlistValidation = Joi.object({
  items: {
    productId: Joi.number().required(),
    quantity: Joi.number().required(),
  },
});

const updateUserPrivacyValidation = Joi.object({
  is_private: Joi.boolean(),
});

const loginValidation = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required().min(3).max(50).required(),
});
const loginAdminValidation = Joi.object({
  email: Joi.string().email().required(),

  password: Joi.string().min(2).required(),
});

const emailValidation = Joi.object({
  email: Joi.string().email().lowercase().required(),
});

const passwordValidation = Joi.object({
  password: Joi.string().min(2).required(),
});

const createPostValidation = Joi.object({
  name: Joi.string().allow("").optional(),
  price: Joi.number(),
  mentions: Joi.string(),
  media_type: Joi.string().valid("image", "video", "audio", "text").required(),
  type: Joi.string().valid("open", "subscription", "premium").required(),
  is_highlight: Joi.boolean(),
  thumbnail: Joi.any(),
});

const postRatingValidation = Joi.object({
  rating: Joi.number().greater(0).less(6).required(),
});

const createMessageGroupValidation = Joi.object({
  usersList: Joi.array(),
  type: Joi.string().valid("single", "group").required(),
  name: Joi.string().min(3).max(30),
  description: Joi.string().min(2).max(1000),
});

const createFollowRequestUpdateValidation = Joi.object({
  status: Joi.string().valid("accepted", "rejected").required(),
});

const getMessageGroupValidation = Joi.object({
  sender: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required(),
  receiver: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required(),
});

const getPostsStatsValidation = Joi.object({
  id: Joi.string().required(),
});

const newMessageValidation = Joi.object({
  conversationId: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required(),
  type: Joi.string().valid("image", "video", "audio", "text").required(),
  message: Joi.string().required(),
  sender: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required(),
});

const newNotificationValidation = Joi.object({
  actor: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required(),
  verb: Joi.string()
    .valid(
      "post",
      "rate",
      "comment",
      "follow-request",
      "follow-accept",
      "post-mention"
    )
    .required(),
  object: Joi.string().required(),
  receiver: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required(),
});

const createGiftValidation = Joi.object({
  name: Joi.string().required(),
  cost: Joi.number().required(),
});
const paymentTypeValidation = Joi.object({
  type: Joi.string().required(),
  price: Joi.number().required(),
});

module.exports = {
  registerValidation,
  loginValidation,
  updateProspectValidation,
  categoryValidation,
  productValidation,
  wishlistValidation,
  contactUsValidation,
  orderValidation,
  skuValidation,
  paymentValidation,
  loginAdminValidation,
  createQuoteValidation,
  createShipMentValidation,
  createContactValidation,
  updateContactValidation
};
