const mongoose = require("mongoose");

const attendenceSchema = new mongoose.Schema(
    {
        date: {
            type: Date,
            required: true,
        },
        attentedStudents: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Student",
            },
        ],
    })
    
const Attendence = mongoose.model("Attendence", attendenceSchema);

module.exports = Attendence;