const User = require('../models/User');

module.exports = async (req, res, next) => {
    const apiKey = req.header('x-api-key');
    if (!apiKey) {
        return res.status(401).json({ msg: 'No API key, authorization denied' });
    }

    try {
        const user = await User.findOne({ api_key: apiKey });
        if (!user) {
            return res.status(401).json({ msg: 'Invalid API key' });
        }

        req.user = user;
        next();
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};