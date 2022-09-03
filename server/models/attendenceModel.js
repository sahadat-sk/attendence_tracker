const mongoose = require("mongoose");

const attendenceSchema = new mongoose.Schema(
    {
        class: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Class",
        },
        
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