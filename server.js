const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes/index');
const Usuarios = require('./models/user');
const Albums = require('./models/album');
const url = 'mongodb+srv://gfrey97:rDweClg2PHVeGwM7@plataformadisco.xqwt0.mongodb.net/?retryWrites=true&w=majority&appName=PlataformaDisco';

const app = express();

app.use(express.json());

app.use('/', router);

const connectToMongo = async () => {
    try {
        await mongoose.connect(url);
        
        app.listen(5000, () => {
            console.log('Servidor escuchando en el puerto 5000 y DB conectada');
        })
    } catch (error) {
        console.log(error);
    }
}

connectToMongo();