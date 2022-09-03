const Attendence = require("../../models/attendenceModel");

module.exports = async (req, res) => {
    try {
        const { classId ,studentId} = req.body;

        const ifExists = await Attendence.findOne({
            class: classId,
        });
        if(!ifExists){
             const newAttendence = await Attendence.create({
                 class: classId,
                 date: new Date(),
             });
        }

       //adds the student to the attendence list
        const classData = await Attendence.findOneAndUpdate(
            { class: classId },
            { $addToSet: { attentedStudents: studentId } },
            { new: true }
        ).populate("attentedStudents");
        res.json(classData);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}