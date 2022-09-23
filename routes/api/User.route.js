const router = require("express").Router();

const validateAccessToken = require("../../middlewares/jwtValidation");

const forgotPassword = require("../../controllers/user/forgotPassword");
const verifyOTP = require("../../controllers/user/verifyOTP");
const resetPassword = require("../../controllers/user/resetPassword");
const verifyEmail = require("../../controllers/user/verifyEmail");
const currentUser = require("../../controllers/user/currentUser");
const adminCurrentUser = require("../../controllers/user/adminCurrentUser");
const getProspectUser = require("../../controllers/user/getProspectUser");
const getUsers = require("../../controllers/user/getUsers");
const updateUser = require("../../controllers/user/updateUser");
const updatePassword = require("../../controllers/user/updatePassword");
const createOfflineuser = require("../../controllers/user/createOfflineuser");

const roleCheck = require("../../middlewares/roleCheck");

const getSingleUser = require("../../controllers/user/getSingleUser");

router.post("/forgotPassword", forgotPassword);
router.get("/me", validateAccessToken, currentUser);
router.get("/admin/me", validateAccessToken, adminCurrentUser);
router.post("/verifyOtp/:token", verifyOTP);
router.post("/resetPassword/:token", resetPassword);
router.post("/verifyEmail/:token", validateAccessToken, verifyEmail);
router.get("/prospectusers", validateAccessToken, getProspectUser);
router.get("/fetchAllUsers", validateAccessToken, getUsers);
router.put("/update", validateAccessToken, updateUser);
router.put("/updatepassword/:id", validateAccessToken, updatePassword);
router.get("/fetchUser", validateAccessToken, getSingleUser);

router.post(
  "/admin/createUser",
  validateAccessToken,
  (req, res, next) => roleCheck(req, res, next, ["admin"]),
  createOfflineuser
);

module.exports = router;
