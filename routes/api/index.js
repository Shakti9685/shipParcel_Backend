const router = require("express").Router();

const authRoutes = require("./Auth.route");

const userRoutes = require("./User.route");
const QuoteRoutes = require("./Quotes.route");

const categoryRoutes = require("./Category.route");
const contactUsRoutes = require("./ContactUs.route");
const ordersRoutes = require("./Orders.route");
const reportsRoutes = require("./Report.route");

const validateAccessToken = require("../../middlewares/jwtValidation");

router.use("/auth", authRoutes);

router.use("/user", userRoutes);

router.use("/quote", QuoteRoutes);


router.use(
  "/category",

  categoryRoutes
);
router.use(
  "/contact",

  contactUsRoutes
);
router.use(
  "/orders",

  ordersRoutes
);
router.use(
  "/reports",

  reportsRoutes
);

router.get("/test", validateAccessToken, (req, res) => {
  res.status(200).json({
    message: "success",
  });
});

router.get("/ping", (req, res) => {
  res.json({ success: "true", message: "successful request" });
});

module.exports = router;
