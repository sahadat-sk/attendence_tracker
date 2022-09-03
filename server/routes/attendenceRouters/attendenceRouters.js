const express = require("express");
const router = express.Router();
const  gettotalattendence  = require("../../controllers/attendenceControllers/gettotalattendence");
const addattendence = require("../../controllers/attendenceControllers/addAttendence")
const getattendence = require("../../controllers/attendenceControllers/getattendence");

router.post("/gettotalattendence", gettotalattendence);
router.post("/addattendence", addattendence);
router.post("/getattendence", getattendence);

module.exports = router;