const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: (email|| '').toLowerCase() });
        if (!user || !(await bcrypt.compare(password || '', user.password)))
            return res.status(401).json({ message: 'Email ou mot de passe incorrect' });

        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIN: '1d' }
        );
        res.cookie('token', token, {
            httpOnly: true,
            sameSite: 'lax',
            maxAge: 24 * 60 * 60 * 1000
        });
        res.json({ message: 'Connecté', username: user.username });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.json({ message: 'Déconnecté' });
});

module.exports = router;