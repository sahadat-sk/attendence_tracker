const mongoose = require("mongoose");

const educatorSchema = new mongoose.Schema(
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

        enrolledClasses: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Class",
            },
        ],

        refreshToken: {
            type: String,
            default: "",
        },
    },
    { timestamps: true }
);

const Educator = mongoose.model("Educator", educatorSchema);

module.exports = Educator;
