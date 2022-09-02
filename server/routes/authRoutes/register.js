const express = require("express");
const router = express.Router();
const registerController = require("../../controllers/authControllers/registerController");

//console.log("registerController", registerController);

router.post("/", registerController.handleNewStudent);

module.exports = router;