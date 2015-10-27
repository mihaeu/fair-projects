module.exports.get = function (req, res) {
    var subjectModel = require('../models/SubjectModel');
    res.json(subjectModel.getAll());
}
