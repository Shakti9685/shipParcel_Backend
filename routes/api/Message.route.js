const router = require("express").Router();

// bring in models and controllers
const getConversationList = require("../../controllers/message/getConversationList");
const deleteConversation = require("../../controllers/message/deleteConversation");
const createConversation = require("../../controllers/message/createConversation");
const createMessage = require("../../controllers/message/createMessage");
const getMessages = require("../../controllers/message/getMessages");
const deleteMessage = require("../../controllers/message/deleteMessage");
const unsendMessage = require("../../controllers/message/unsendMessage");
const markMessageRead = require("../../controllers/message/markMessageRead");
const checkIfConversationExists = require("../../controllers/message/checkIfConversationExists");
const getConversation = require("../../controllers/message/getConversation");
const acceptConversationStatus = require("../../controllers/message/acceptConversationStatus");
const closeConversationStatus = require("../../controllers/message/closeConversationStatus");
const requestConversation = require("../../controllers/message/requestConversation");

// Get conversations list
router.get("/conversation", getConversationList);

// Get single conversation details
router.get("/conversation/:id", getConversation);

// get if con exist between the currentUser and receiver
router.get("/conversationExists", checkIfConversationExists);

// Delete single conversation
router.delete("/conversation/:id", deleteConversation);

// Create conversation
router.post("/conversation", createConversation);

// Send message
router.post("/", createMessage);

// Get messages
router.get("/", getMessages);

// Delete message
router.delete("/:id", deleteMessage);

// Unsend message
router.delete("/unsend/:id", unsendMessage);

// Mark message read
router.post("/:id/read", markMessageRead);

// Request Conversation start
router.post("/conversation/:id/request", requestConversation);

// Accept conversation request
router.post("/conversation/:id/accept", acceptConversationStatus);

// Close conversation status
router.post("/conversation/:id/close", closeConversationStatus);

module.exports = router;
