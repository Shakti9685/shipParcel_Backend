const createQuotes = require("../../controllers/quote/createQuote");
const generateAccessToken = require("../../controllers/quote/generateAccessToken");
const getQuote = require("../../controllers/quote/getQuote");
const getHistory = require("../../controllers/historyAndTracking/getHistory");
const deleteHistoryById = require("../../controllers/historyAndTracking/deleteHistoryById");
const deleteHistory = require("../../controllers/historyAndTracking/deleteHistory");
const createShipMent = require("../../controllers/RateAndShip/createShipment");
const createContact = require("../../controllers/Accounts/addressBook/addContact");
const getContacts = require("../../controllers/Accounts/addressBook/getContacts");
const getContactsById = require("../../controllers/Accounts/addressBook/getContactById")
const deleteContactById = require("../../controllers/Accounts/addressBook/deleteContactById");
const updateContactsById = require("../../controllers/Accounts/addressBook/updateContact")



const router = require("express").Router();

router.post("/createQuote", createQuotes);

router.post("/createShipMent",createShipMent)

router.get("/shipment",generateAccessToken ,getQuote)

//Contacts Api
router.get("/contacts",getContacts);

router.get("/contacts/:contactId",getContactsById);

router.put("/contacts/:contactId",updateContactsById);

router.delete("/contacts/:contactId",deleteContactById);

router.post("/createContact",createContact);

//History and Tracking Api

router.delete("/history/:id",deleteHistoryById);

router.delete("/history",deleteHistory);

router.get("/history",getHistory);





module.exports = router;