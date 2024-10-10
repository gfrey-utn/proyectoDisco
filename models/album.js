const mongoose = require('mongoose');
// titulo, descripcion, año, canciones (titulo, duracion), portada (URL)

const Albums = new mongoose.Schema({
    titulo: {type: String, required: [true, "Por favor ingrese un título"]},
    descripcion: {
        type: String,
        minLength: 5,
        maxLength: 200,
        required: [true, "Por favor ingrese una descripción"]
    },
    año: {
        type: Number,
        min: 0,
        required: [true, "Por favor ingrese una fecha de lanzamiento"]
    },
    canciones: [
       {
          titulo: {type: String},
          duracion: {type: String}
       }
    ],
    portada: {type: String}
})

module.exports = mongoose.model("Albums", Albums);