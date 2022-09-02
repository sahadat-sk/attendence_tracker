const Student = require("../../models/studentModel");

const handleLogout = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204); //no content
    const refreshToken = cookies.jwt;

    const foundStudent = await Student.findOne({ refreshToken });
    if (!foundStudent) {
        res.clearCookie("jwt", {
            httpOnly: true,
            sameSite: "None",
            secure: true,
        });
        return res.sendStatus(204); //no content
    }
    foundStudent.refreshToken = "";
    await foundStudent.save();
    res.clearCookie("jwt", {
        httpOnly: true,
        sameSite: "None",
        secure: true,
    });
    res.sendStatus(204); //no content
};

module.exports = { handleLogout };
