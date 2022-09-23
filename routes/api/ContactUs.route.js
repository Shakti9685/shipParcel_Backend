const router = require("express").Router();

const createContactUs = require("../../controllers/contactUs/createContactUs");

const deleteContactUs = require("../../controllers/contactUs/deleteContactUs");
const getContactUs = require("../../controllers/contactUs/getContactUs");
const validateAccessToken = require("../../middlewares/jwtValidation");

const roleCheck = require("../../middlewares/roleCheck");
const getSingleContactUs = require("../../controllers/contactUs/getSingleContactUs");

router.post("/create", createContactUs);
router.delete(
  "/:id",
  validateAccessToken,

  (req, res, next) => roleCheck(req, res, next, ["admin"]),
  deleteContactUs
);
router.get(
  "/",
  validateAccessToken,
  (req, res, next) => roleCheck(req, res, next, ["admin"]),
  getContactUs
);
router.get(
  "/:id",
  validateAccessToken,
  (req, res, next) => roleCheck(req, res, next, ["admin"]),
  getSingleContactUs
);

module.exports = router;
