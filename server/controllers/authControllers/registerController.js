const Student = require("../../models/studentModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

SECURE = false;

const handleNewStudent = async (req, res) => {
    const { name, username, password ,isEducator} = req.body;
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
            isEducator
        });
        const refreshToken = jwt.sign(
            { name: student.username, _id: student._id , isEducator },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: "1d" }
        );
        await Student.findOneAndUpdate({ username }, { refreshToken: refreshToken });
        const accessToken = jwt.sign(
            {
                id: student._id,
                name: student.name,
                isEducator
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "300s" }
        );

        //cookie with refrest token
        res.cookie("jwt", refreshToken, {
            httpOnly: true,
            secure: SECURE, // change this is production
            sameSite: "None",
            maxAge: 24 * 60 * 60 * 1000,
        });
        res.status(201).json({  accessToken, _id : student._id });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { handleNewStudent };
