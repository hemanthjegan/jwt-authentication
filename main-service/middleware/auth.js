const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    if (!token) return res.status(401).send('Access denied');

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id);
        next();
    } catch (ex) {
        res.status(400).send('Invalid token');
    }
};
