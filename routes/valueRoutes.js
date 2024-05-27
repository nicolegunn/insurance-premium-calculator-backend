const express = require("express");
const router = express.Router();
const valueController = require("../controllers/valueController.js");

//router.post("/value", valueController.postValue);
//router.post("/value", valueController.validateVehicle);
router.post("/value", valueController.calculateCarValue);

module.exports = router;
