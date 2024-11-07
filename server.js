const express = require('express');
const mongoose = require('mongoose');
const usersRouter = require('./routes/users');
const albumsRouter = require('./routes/albums');
const dotenv = require('dotenv').config();

const url = process.env.DATABASE_URL;
const PORT = process.env.PORT;
const app = express();

const path = require("path");

app.use(express.json());
app.use(express.static(path.join(__dirname, "./public")));	// Servimos archivos estáticos
app.use('/user', usersRouter);
app.use('/band', albumsRouter);

const connectToMongo = async () => {
    try {
        await mongoose.connect(url);
        
        app.listen(PORT, () => {
            console.log('Servidor escuchando en el puerto ' + PORT + ' y DB conectada');
        })
    } catch (error) {
        console.log(error);
    }
}

connectToMongo();