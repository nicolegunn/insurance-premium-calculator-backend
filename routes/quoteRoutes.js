const express = require("express");
const router = express.Router();
const quoteController = require("../controllers/quoteController.js");

router.post("/quote", quoteController.postQuote);

module.exports = router;
