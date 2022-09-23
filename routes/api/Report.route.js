const router = require("express").Router();

const getReports = require("../../controllers/report/getReports");
const updateReportPayment = require("../../controllers/report/updateReportPayment");
const getPaidTax = require("../../controllers/report/getPaidTax");
const getCategoryTax = require("../../controllers/report/getCategoryTax");

const validateAccessToken = require("../../middlewares/jwtValidation");
const roleCheck = require("../../middlewares/roleCheck");

router.get(
  "/",
  // validateAccessToken,
  // (req, res, next) => roleCheck(req, res, next, ["admin"]),
  getReports
);
router.post(
  "/payTax",
  validateAccessToken,
  (req, res, next) => roleCheck(req, res, next, ["admin"]),
  updateReportPayment
);
router.get(
  "/getPaidTaxDetails",
  validateAccessToken,
  (req, res, next) => roleCheck(req, res, next, ["admin"]),
  getPaidTax
);
router.get(
  "/getCategoryTax",
  validateAccessToken,
  (req, res, next) => roleCheck(req, res, next, ["admin"]),
  getCategoryTax
);

module.exports = router;
