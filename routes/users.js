const express = require('express');
const Usuarios = require('../models/user');
const router = express.Router();

// 1) Crear un usuario
router.post('/', async (req, res) => {
    try {
        await Usuarios.create(req.body);
        res.status(201).send('Usuario creado correctamente');
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error al crear el usuario');
    }
})

// 2) Buscar un usuario en particular
router.get('/:id', async (req, res) => {
    try {
        const user = await Usuarios.findById(req.params.id);
        if (user) {
            const usuarioSinPass = {
                nombre: user.nombre,
                apellido: user.apellido,
                email: user.email,
                favoritos: user.favoritos
            }
            res.status(200).send(usuarioSinPass);
        } else {
            res.status(404).send('No se encontró ese usuario');
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Algo salió mal :(');
    }
})

// 3) Editar un usuario
router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const albumEditado = req.body;
        await Usuarios.findByIdAndUpdate(id, albumEditado, {new: true});
    
        res.status(200).send("Usuario actualizado correctamente");        
    } catch (error) {
        console.log(error);
        res.status(500).send("Error al actualizar el usuario");
    }
})

module.exports = router;