const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        
        enrolledClasses: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Class"
        }],

        refreshToken: {
            type: String,
            default: "",
        },
    },
    { timestamps: true }
);

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
