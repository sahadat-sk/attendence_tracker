const Class = require("../../models/classModel");
const Student = require("../../models/studentModel");

module.exports = async (req, res) => {
    const { classId,studentId,enrollKey } = req.body;
    try {
        const classs = await Class.findById(classId);
        const student = await Student.findById(studentId);
        if (classs.key === enrollKey) {
            if (!student.enrolledClasses.includes(classId)) {
                student.enrolledClasses.push(classId);
                classs.studentsEnrolled.push(studentId);
                await student.save();
                await classs.save();
            }
        } else {
            res.status(400).json({ error: "Invalid key" });
        }
        res.status(200).json(student.enrolledClasses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
