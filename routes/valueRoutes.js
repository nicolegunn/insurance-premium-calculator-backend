const express = require("express");
const router = express.Router();
const valueController = require("../controllers/valueController.js");

router.post("/value", valueController.postValue);

module.exports = router;
