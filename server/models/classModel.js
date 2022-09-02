const mongoose = require("mongoose");

const classSchema = new mongoose.Schema(
    {
        educator: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Educator",
        },
        module: {
            type: String,
            unique: true,
            trim: true,
        },
        key: {
            type: String,
            trim: true,
            unique: true,
        },
        studentsEnrolled: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Student",
            },
        ],
        attendence: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Attendence",
            },
        ],
    },
    { timestamps: true }
);

const Class = mongoose.model("Class", classSchema);

module.exports = Class;
