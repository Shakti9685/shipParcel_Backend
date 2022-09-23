const router = require("express").Router();

const createOrders = require("../../controllers/orders/createOrders");
const deleteOrders = require("../../controllers/orders/deleteOrder");
const getOrders = require("../../controllers/orders/getOrders");
const validateAccessToken = require("../../middlewares/jwtValidation");

const roleCheck = require("../../middlewares/roleCheck");
const getSingleOrders = require("../../controllers/orders/getSingleOrders");
const updateSkuOrder = require("../../controllers/orders/updateSkuOrder");
const addProductItems = require("../../controllers/orders/addProductItems");
const updateOrderStatus = require("../../controllers/orders/updateOrderStatus");
const getUserOrderDetails = require("../../controllers/orders/getUserOrderDetails");
const addShippingFee = require("../../controllers/orders/addShippingFee");
const updateShipping = require("../../controllers/orders/updateShipping");
const getUserOrdersDetails = require("../../controllers/orders/getUserOrdersDetails");
const updateIndividualOrder = require("../../controllers/orders/updateIndividualOrder");
const deleteIndividualOrder = require("../../controllers/orders/deleteIndividualOrder");
const deleteIndividualProduct = require("../../controllers/orders/deleteIndividualProduct");
const PrintInVoice = require("../../controllers/orders/PrintInVoice");
router.post(
  "/create/:id",
  validateAccessToken,

  createOrders
);

router.get(
  "/",
  validateAccessToken,
  (req, res, next) => roleCheck(req, res, next, ["admin"]),

  getOrders
);
router.get(
  "/user",
  validateAccessToken,

  getUserOrderDetails
);
router.get(
  "/user/:id",
  validateAccessToken,

  getUserOrdersDetails
);
router.put(
  "/:id",
  validateAccessToken,

  (req, res, next) => roleCheck(req, res, next, ["admin"]),
  updateOrderStatus
);
router.get(
  "/:id",
  validateAccessToken,

  getSingleOrders
);
router.delete(
  "/:id",
  validateAccessToken,

  (req, res, next) => roleCheck(req, res, next, ["admin"]),
  deleteOrders
);
router.delete(
  "/:id",
  validateAccessToken,

  (req, res, next) => roleCheck(req, res, next, ["admin"]),
  deleteIndividualProduct
);
router.get(
  "/printInvoice/:id",
  // validateAccessToken,

  PrintInVoice
);
router.put(
  "/updateOrder/:id",
  // validateAccessToken,

  updateSkuOrder
);
router.put(
  "/addShippingFee/:id",

  validateAccessToken,
  (req, res, next) => roleCheck(req, res, next, ["admin"]),

  addShippingFee
);
router.put(
  "/updateShipping/:id",

  validateAccessToken,
  (req, res, next) => roleCheck(req, res, next, ["admin"]),

  updateShipping
);
router.put(
  "/individualOrder/:id",

  validateAccessToken,
  (req, res, next) => roleCheck(req, res, next, ["admin"]),

  updateIndividualOrder
);
router.delete(
  "/individualOrder/:id",

  validateAccessToken,
  (req, res, next) => roleCheck(req, res, next, ["admin"]),

  deleteIndividualOrder
);
router.put(
  "/addProduct/:orderId/user/:userId",

  validateAccessToken,
  (req, res, next) => roleCheck(req, res, next, ["admin"]),

  addProductItems
);

module.exports = router;
