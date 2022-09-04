const express = require("express");
const router = express.Router();
const  getCourses  = require("../../controllers/couseColtrollers/getCourses");
const addCourses = require("../../controllers/couseColtrollers/addCourse")
const enroll = require("../../controllers/couseColtrollers/enroll");
const getEnrolledCourses = require("../../controllers/couseColtrollers/getEnrolledCourses");
const getEducatorCourses = require("../../controllers/couseColtrollers/geteducatorcourses");


router.get("/getcourses",getCourses);
router.post("/addcourses",addCourses);
router.post("/enroll", enroll);
router.get("/getenrolledcourses",getEnrolledCourses);
router.post("/geteducatorcourses",getEducatorCourses);

module.exports = router;
