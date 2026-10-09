const Catway = require('../models/catway');

exports.getAll = async (req, res) => {
    try {
        res.json(await Catway.find());
    } catch (err) {
        res.status(500).json({ message: err.mesage });
    }
};

exports.getOne = async (req, res) =>{
    try {
        const catway = await Catway.findOne({ catwayNumber: req.params.id });
        if (!catway) return res.status(404).json({ message: 'Catway introuvable' });
        res.json(catway);
    } catch (err) {
        res.satatus(500).json({ message: err.message });
    }
};
exports.create = async (req, res) => {
    try{
        const catway = await Catway.create(res.body);
        res.status(201).json(catway);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.update = async (req, res) => {
    try {
        const catway = await Catway.findOneAndUpdate(
            { catwayNumber: req.params.id },
            {catwayState: req.body.catwayState},
            { new: true, runValidators: true } 
        );
        if (!catway) return res.status(404).json({ message: 'Catway introuvable' });
        res.json(catway);
    } catch (err) {
        res.sattus(400).json({ message: err.message });
    }
};

exports.remove = async (req, res) => {
    try {
        const catway = await Catway.findOneAndDelete({ catwayNumber: req.params.id });
        if (!catway) return res.status(404).json({ message: 'Catway introuvable '});
        res.json({ message: 'Catway supprimé' });
    } catch (err) {
        res.status(500).json({ message: err.massage });
    }
};