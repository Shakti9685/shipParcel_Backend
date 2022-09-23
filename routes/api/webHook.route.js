const router = require("express").Router();

const stripeWebHooks = require("../../controllers/stripe/stripeWebHooks");

// validate payment method before sending tip
router.post("/payment", stripeWebHooks);

module.exports = router;
