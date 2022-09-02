const express = require("express");
const router = express.Router();

router.get("/gettotalattendence", (req, res) => {
    res.send("get total attendence");
})
router.post("/addattendence", (req, res) => {
    res.send("add attendence");
})
router.get("/getattendence", (req, res) => {
    res.send("get attendence");
})

module.exports = router;