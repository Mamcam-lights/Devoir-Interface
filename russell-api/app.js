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