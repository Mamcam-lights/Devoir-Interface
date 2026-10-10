const express = require('express');
const mongoose = require('mongoose');

const app = express();
const cookieParser = require('cookie-parser');
const middlewares = require('./models/middlewares');

app.use(express.json());
app.use(cookieParser());

app.use('/', require('./routes/authentificationroute'));
app.use('/catways', middlewares, require('./routes/route'));
app.use('/catways/:id/reservations', middlewares, require('./routes/reservationroute'));
app.use('/users', middlewares, require('./routes/userroute'));

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connecté'))
    .catch(err => console.error(err));

app.get('/' , (req, res) => res.send('API Russell OK'));
app.listen(process.env.PORT , () =>
    console.log(`Serveur sur le port ${process.env.PORT}`)); 