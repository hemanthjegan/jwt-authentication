const User = require('../models/User');
const Candidate = require('../models/Candidate');

exports.getProfile = async (req, res) => {
    const user = await User.findById(req.header('user_id'));
    if (!user) return res.status(404).send('User not found');
    res.send(user);
};

exports.getCandidates = async (req, res) => {
    const candidates = await Candidate.find({ user_id: req.header('user_id') });
    res.send(candidates);
};

