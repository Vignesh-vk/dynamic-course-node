const User = require('../model/users');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

const SignUp = async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        const user = new User({ name, email, password, role });
        await user.save();
        res.status(201).send({ message: 'User created successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const Login = async (req, res) => {
    const { email, password, role } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).send({ message: 'Invalid credentials' });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).send({ message: 'Invalid credentials' });
        }

        if (user.role !== role) {
            return res.status(403).send({ message: 'Role does not match' });
        }

        const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
        res.send({ token, role: user.role });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    SignUp,
    Login
};