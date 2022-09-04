const Class = require("../../models/classModel");

module.exports = async (req, res) => {
    try {
        const { educatorId } = req.body;

        const classes = await Class.find({ educator: educatorId }).populate(
            "educator"
        );

        res.status(200).json(classes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
