const Student = require("../../models/studentModel");

module.exports = async (req, res) => {

    console.log(req);
    try {
        const students = await Student.findById(req.user._id).populate(
            "enrolledClasses"
        );

        res.status(200).json(students.enrolledClasses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}