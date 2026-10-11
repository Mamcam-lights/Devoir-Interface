const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const jwt = require('jsonwebtoken');

const app = express();
const cookieParser = require('cookie-parser');
const middlewares = require('./models/middlewares');

app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'accespublic')));

app.get('/dashboard', (req, res) => {
    try {
        jwt.verify(req.cookies.token, process.env.JWT_SECRET);
        res.sendFile(path.join(__dirname, 'views', 'dashboard.html'));
    } catch (err) {
        res.redirect('/');
    }
});

app.use('/', require('./routes/authentificationroute'));
app.use('/catways', middlewares, require('./routes/route'));
app.use('/catways/:id/reservations', middlewares, require('./routes/reservationroute'));
app.use('/users', middlewares, require('./routes/userroute'));

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connecté'))
    .catch(err => console.error(err));

app.listen(process.env.PORT , () =>
    console.log(`Serveur sur le port ${process.env.PORT}`)); 