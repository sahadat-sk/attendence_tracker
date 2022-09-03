const Attendence = require("../../models/attendenceModel");

module.exports = async (req, res) => {
    try {
        const { classId } = req.body;
        const classData = await Attendence.find({
            class: classId,
        }).populate("attentedStudents");
       // console.log(classData.length);
        res.json({length:classData.length});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}