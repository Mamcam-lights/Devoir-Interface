const Reservation = require('../models/reservation');
const Catway = require('../models/catway');

async function hasOverlap(catwayNumber, start, end, excludeId){
    const filter = {
        catwayNumber,
        startDate: { $lt: end },
        endDate: { $gt: start },
    };
    if (excludeId) filter._id = { $ne: excludeId };
    return await Reservation.exists(filter);
}

exports.getAll = async (req, res) => {
    try {
        res.json(await Reservation.find({ catwayNumber: req.params.id }));
    }catch (err) {
        res.status(500).json({ message: err.message});
    }
};

exports.getOne = async (req, res) =>{
    try{
        const r = await Reservation.findOne({
            _id: req.params.idReservation,
            catwayNumber: req.params.id
        });
        if (!r) return res.status(404).json({ message: 'Réservation introuvable' });
        res.json(r);
    }catch (err){
        res.status(500).json({ message: err.message });
    }
};

exports.create = async (req, res) => {
    try {
        const catwayNumber = Number(req.params.id);
        if (!(await Catway.exists({ catwayNumber })))
            return res.status(400).json({ message: 'Catway introuvable' });
        const { clientName, boatName, startDate, endDate } = req.body;
        if (new Date(endDate) <= new Date(startDate))
            return res.status(400).json({ message: 'La date de fin doit être après la date de debut' });
        if (await hasOverlap(catwayNumber, startDate, endDate))
            return res.status(409).json({ message: 'Catway déjà réservé sur cette période' });
        const r = await Reservation.create({ catwayNumber, clientName, boatName, startDate, endDate });
        res.status(201).json(r);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.update = async (req, res) => {
    try {
        const current = await Reservation.findOne({
            _id: req.params.idReservation,
            catwayNumber: req.params.id
        });
        if (!current) return res.status(404).json({ message: 'Réservation introuvable' });

        const { clientName, boatName, startDate, endDate } = req.body;
        const start = startDate || current.startDate;
        const end = endDate || current.endDate;
        if (new Date(end) <= new Date(start))
            return res.status(400).json({ message: 'La date de fin doit être après la date de debut' });
        if (await hasOverlap(current.catwayNumber, start, end, current._id))
            return res.status(409).json({ message: 'catway déjà réservé sur cette période' });
        if (clientName) current.clientName = clientName;
        if (boatName) current.boatName = boatName;
        if (startDate) current.startDate = startDate;
        if (endDate) current.endDate = endDate;
        await current.save();
        res.json(current);
    }catch (err) {
        res.status(400).json({ message: err.message});
    }
};

exports.remove = async (req, res) => {
    try{
        const r = await Reservation.findOneAndDelete({
            _id: req.params.idReservation,
            catwayNumber: req.params.id
        });
        if (!r) return res.status(404).json({ message: 'Réservation introuvable' });
        res.json({ message: 'Réservation supprimée' });
    }catch (err) {
        res.status(500).json({ message: err.message });
    }
};