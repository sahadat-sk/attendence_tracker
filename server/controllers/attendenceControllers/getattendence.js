
const Attendence = require("../../models/attendenceModel");

module.exports = async (req, res) => {
    try {
        const { classId } = req.body;
        const classData = await Attendence.find({
            class: classId,
            attentedStudents:{$elemMatch:{$eq:req.user._id}}}
        ).populate("attentedStudents");
        res.json(classData.length);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
