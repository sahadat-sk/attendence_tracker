require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const credentials = require("./config/credentials");
const connectDb = require("./config/connectDb");
const PORT = process.env.PORT || 5000;
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const verifyJWT = require("./middleware/verifyJWT");

//connecting to MongoDB
connectDb();

app.use(credentials);
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
    res.send("Hello");
});

app.use("/register", require("./routes/authRoutes/register"));
app.use("/login", require("./routes/authRoutes/login"));
app.use("/refresh", require("./routes/authRoutes/refresh"));
app.use("/logout", require("./routes/authRoutes/logout"));

app.use(verifyJWT);
app.use("/course", require("./routes/courseRouters/courseRoutes"));

mongoose.connection.once("open", () => {
    console.log("MongoDb Connected");
    app.listen(PORT, () => {
        console.log("Server started...");
    });
});
