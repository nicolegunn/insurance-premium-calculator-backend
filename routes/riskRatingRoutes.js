const express = require("express");
const router = express.Router();
const riskRatingController = require("../controllers/riskRatingController.js");

router.post("/risk_rating", riskRatingController.postRiskRating);

module.exports = router;
