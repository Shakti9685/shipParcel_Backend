const router = require("express").Router();

// bring in models and controllers
const getNotifications = require("../../controllers/notification/getNotifications");
const markNotificationsRead = require("../../controllers/notification/markNotificationsRead");

// fetch list of notifications
router.get("/", getNotifications);

// mark all notifications as read
router.post("/read", markNotificationsRead);

module.exports = router;
