const mongoose = require('mongoose');
// nombre, apellido, email, contraseña, favoritos

const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

const Usuarios = new mongoose.Schema({
    nombre: {type: String, minLength: [2, "El nombre debe tener más de un caracter"]},
    apellido: {type: String, minLength: [2, "El apellido debe tener más de un caracter"]},
    email: {
      type: String,
      required: true,
      validate: {
        validator: function(v) {
          return regex.test(v);
        },
        message: 'Por favor ingrese un mail válido'
      },
    },
    contraseña: {type: String, required: [true, "La contraseña es obligatoria"]},
    favoritos: [
       {
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
       }
    ]
})

module.exports = mongoose.model("Usuarios", Usuarios);