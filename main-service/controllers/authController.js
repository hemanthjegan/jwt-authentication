const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.register = async (req, res) => {
    const { first_name, last_name, email, password } = req.body;
    const password_hash = await bcrypt.hash(password, 10);

    const user = new User({ first_name, last_name, email, password_hash });
    await user.save();
    res.send('User registered successfully');
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send('Invalid email or password');

    const validPassword = await bcrypt.compare(password, user.password_hash);
    if (!validPassword) return res.status(400).send('Invalid email or password');

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.send({ token });
};

exports.protected = (req, res) => {
    res.send('This is a protected route');
};
