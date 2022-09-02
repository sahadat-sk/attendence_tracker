const Student = require("../../models/studentModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const handleNewStudent = async (req, res) => {
    const { name, username, password } = req.body;
    if (!name || !username || !password) {
        return res.status(400).json({ message: "Please enter all fields" });
    }
    const duplicate = await Student.findOne({ username });
    if (duplicate) return res.sendStatus(409);
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const student = await Student.create({
            name,
            username,
            password: hashedPassword,
        });
        const refreshToken = jwt.sign(
            { name: student.username, _id: student._id },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: "1d" }
        );
        await Student.findOneAndUpdate({ username }, { refreshToken: refreshToken });
        const accessToken = jwt.sign(
            {
                id: student._id,
                name: student.name,
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "300s" }
        );

        //cookie with refrest token
        res.cookie("jwt", refreshToken, {
            httpOnly: true,
            secure: true, // change this is production
            sameSite: "None",
            maxAge: 24 * 60 * 60 * 1000,
        });
        res.status(201).json({ student, accessToken, _id : student._id });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { handleNewStudent };
