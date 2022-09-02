const Student = require("../../models/studentModel");
const jwt = require("jsonwebtoken");

const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies;
    //console.log(cookies);
    if (!cookies?.jwt) return res.sendStatus(401);
    const token = cookies.jwt;
    const foundstudent = await Student.findOne({ refreshToken: token });
    if (!foundstudent) return res.sendStatus(403);
    try {
        const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
        const student = await student.findById(decoded._id);
        if (!student) return res.sendStatus(401);
        const accessToken = jwt.sign(
            {
                _id: student._id,
                name: student.name,
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "300s" }
        );
        res.status(200).json({
            name: student.name,
            email: student.email,
            accessToken,
            _id : student._id,
        });
    } catch (error) {
        res.sendStatus(401);
    }
};

module.exports = { handleRefreshToken };
