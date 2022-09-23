const router = require("express").Router();


const loginUser = require("../../controllers/auth/login");
const registerUser=require("../../controllers/auth/register")
const adminLoginUser = require("../../controllers/auth/adminLogin");
const logOutUser = require("../../controllers/auth/logout");
const updateProspectUser = require("../../controllers/auth/updateProspect");
const validateAccessToken = require("../../middlewares/jwtValidation");
const roleCheck = require("../../middlewares/roleCheck");

router.post("/registerUser", registerUser);
router.post("/login", loginUser);
router.post("/admin/login", adminLoginUser);
router.delete("/logout", logOutUser);
// router.post(
//   "/admin/login",
//   (req, res, next) => roleCheck(req, res, next, ["admin"]),
//   loginUser
// );
router.post("/updateProspect/:token", updateProspectUser);

module.exports = router;
