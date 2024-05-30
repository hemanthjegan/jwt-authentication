const Candidate = require('../models/Candidate');

exports.addCandidate = async (req, res) => {
    const { first_name, last_name, email } = req.body;
    const candidate = new Candidate({ first_name, last_name, email, user_id: req.user._id });
    await candidate.save();
    res.send('Candidate added successfully');
};

exports.getCandidates = async (req, res) => {
    const candidates = await Candidate.find({ user_id: req.user._id });
    res.send(candidates);
};
