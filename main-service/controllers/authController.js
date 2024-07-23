const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.register = async (req, res) => {
    const { first_name, last_name, email, password } = req.body;
    let existUser = await User.findOne({ email });
        if (existUser) {
            return res.status(400).send('User already exists');
        }

    const api_key = require('crypto').randomBytes(16).toString('hex');

    const password_hash = await bcrypt.hash(password, 10);

    const user = new User({ first_name, last_name, email, password_hash, api_key });
    await user.save();

    const payload = {
        user: { id: user.id }
    };

    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
        if (err) throw err;
        res.json({ token, api_key });
    });
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send('Invalid email or password');

    const validPassword = await bcrypt.compare(password, user.password_hash);
    if (!validPassword) return res.status(400).send('password Missmatch!');

     const payload = {
            user: { id: user.id }
        };

    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
        if (err) throw err;
        res.json({ 
            token, 
            api_key: user.api_key, 
            user_id: user.id 
        });
    });
};

exports.protected = (req, res) => {
    res.send('This is a protected route');
};
