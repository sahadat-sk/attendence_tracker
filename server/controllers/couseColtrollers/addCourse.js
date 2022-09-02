const Class = require("../../models/classModel");

module.exports = async (req, res) => {
    try {
        const {educatorId,module,key} = req.body;
        const newClass = await Class.create({
            educator:educatorId,module,key
        })
        res.json(newClass);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

