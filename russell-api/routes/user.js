const bcrypt = require('bcrypt');
const User = require('../models/user');

exports.getAll = async (req, res) => {
    try {
        res.json(await User.find().select('-password'));
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getOne = async (req, res) => {
    try{
        const user = await User.findOne({ email: req.params.email.toLowerCase() }).select('password');
        if (!user) return res.status(404).json({ message: 'Utilisateur introuvable' });
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.create = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!password || password.length < 8)
            return res.status(400).json({ message: 'Mot de passe : 8 caractères minimum' });
        const hash = await bcrypt.hash(password, 10);
        const user = await User.create({ username, email, password: hash });
        res.status(201).json({ _id: user._id, username: user.username, email: user.email });
    } catch (err) {
        if (err.code === 11000)
            return res.status(409).json({ message: 'Cet email existe déjà' });
        res.status(400).json({ message: err.message });
    }
};

exports.update = async (req, res) => {
    try {
        const { username, password } = req.body;
        const changes = {};
        if (username) changes.username = username;
        if (password) {
            if (password.length < 8)
                return res.status(400).json({ message: 'Mot de passe : 8 caractères minimum' });
            changes.password = await bcrypt.hash(password, 10);
        }
        const user = await User.findOneAndUpdate(
            { email: req.params.email.toLowerCase() },
            changes,
            { new: true }
        ).select('-password');
        if (!user) return res.status(404).json({ message: 'Utilisateur introuvable' });
        res.json(user);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.remove = async (req, res) => {
    try {
        const user = await User.findOneAndDelete({ email: req.params.email.toLowerCase() });
        if (!user) return res.status(404).json({ message: 'Utilisateur introuvable' });
        res.json({ message: 'Utilisateur supprimé' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};