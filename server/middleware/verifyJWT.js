const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    //console.log("auth:",authHeader);
    if (!authHeader?.startsWith("Bearer ")) {
        return res.status(401).json({
            message: "No token",
        });
    }
    const token = authHeader.split(" ")[1];
    // console.log("accessToken", token);
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                message: "Invalid token",
            });
        }
        req.user = decoded;
        next();
    });
};

module.exports = verifyJWT;
