const mongoose = require('mongoose');

module.exports = mongoose.model('catway', new mongoose.Schema({
    catwayNumber: { type: Number, required: true, unique: true },
    catwaytype: { type: String, enum: ['long', 'short'], required: true },
    catwayState: { type: String, required: true }
}));