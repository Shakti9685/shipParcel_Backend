const router = require("express").Router();

const createCategory = require("../../controllers/category/createCategory");
const updateCategory = require("../../controllers/category/updateCategory");
const deleteCategory = require("../../controllers/category/deleteCategory");
const getCategory = require("../../controllers/category/getCategory");
const getAllCategory = require("../../controllers/category/getAllCategory");
const validateAccessToken = require("../../middlewares/jwtValidation");
const roleCheck = require("../../middlewares/roleCheck");
const getProductsOfmainCategory = require("../../controllers/category/getProductsOfmainCategory");
const getSingleSubCategoryProductDetails = require("../../controllers/category/getSingleSubCategoryProductDetails");

router.post(
  "/create",
  validateAccessToken,

  (req, res, next) => roleCheck(req, res, next, ["admin"]),
  createCategory
);
router.put(
  "/:id",
  validateAccessToken,

  (req, res, next) => roleCheck(req, res, next, ["admin"]),
  updateCategory
);
router.delete(
  "/:id",
  validateAccessToken,

  (req, res, next) => roleCheck(req, res, next, ["admin"]),
  deleteCategory
);
router.get("/", getCategory);
router.get("/all", getAllCategory);
router.get("/:id", getProductsOfmainCategory);
router.get("/product/:subId", getSingleSubCategoryProductDetails);
module.exports = router;
