const Class = require("../../models/classModel");

module.exports = async (req, res) => {
    try {
    // const classes = await Class.find(
    //     {},
    //     { studentsEnrolled: { $elemMatch: { $eq: req.user._id } } }
    // ).populate("educator");

    const classes = await Class.find(
     { studentsEnrolled: { $nin: [req.user._id] } }
    ).populate("educator");

        //console.log(classes);
        res.status(200).json(classes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
