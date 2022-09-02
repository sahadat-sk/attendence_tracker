const express = require("express");
const router = express.Router();
const refreshController = require("../../controllers/authControllers/refreshController");

//console.log("loginController", loginController);

router.get("/", refreshController.handleRefreshToken);

module.exports = router;
