const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connecté'))
    .catch(err => console.error(err));

app.get('/' , (req, res) => res.send('API Russell OK'));
app.listen(process.env.PORT , () =>
    console.log(`Serveur sur le port ${process.env.PORT}`)); 
/*catway.js
module.exports = mongoose.model(catway', neuw mongoose.Scema({
    catwayNumber: { type: Number, required: true, unique: true },
    catwaytype: { type: String, enum: ['long', 'short'], required: true },
    catwayState: { type: String, required: true }
}));*/
/*Reservation.js
module.exports = mongoose.model('Reservation', new mongoose.Schema({
    catwayNumber: {type: Number, required: true },
    clientName: { type: String, required: true },
    boatName: { type: String, required: true},
    startDate: { type: Date, required: true},
    endDate: { type: Date, required: true}
}));*/
/* user.js
module.exports = mongoose.model('User', new mongoose.Schema({
    username: { type: String, required: true},
    email: { type:String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, minlength: 8 }
}));*/
