const express = require('express');
const Albums = require('../models/album');
const router = express.Router();

// 4) Crear un álbum
router.post('/', async (req, res) => {
    try {
        await Albums.create(req.body);
        res.status(201).send('Álbum creado correctamente');
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error al crear el álbum');
    }
})

// 5) Editar un álbum
router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const albumEditado = req.body;
        await Albums.findByIdAndUpdate(id, albumEditado, {new: true});
    
        res.status(200).send("Álbum actualizado correctamente");        
    } catch (error) {
        console.log(error);
        res.status(500).send("Error al actualizar el usuario");
    }
})

// 6) Agregar o eliminar una canción de un álbum    TO-DO
router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const albumEditado = req.body;
        await Albums.findByIdAndUpdate(id, albumEditado, {new: true});
    
        res.status(200).send("Álbum actualizado correctamente");        
    } catch (error) {
        console.log(error);
        res.status(500).send("Error al actualizar el usuario");
    }
})

// 7) Buscar todos los álbums
router.get('/', async (req, res) => {
    try {
        const todosLosAlbums = await Albums.find();
        if (todosLosAlbums.length) {
            res.status(200).send(todosLosAlbums);
        } else {
            res.status(200).send('No hay álbumes');
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Algo salió mal :(')
    }
})

// 8) Buscar un álbum en particular
router.get('/:id', async (req, res) => {
    try {
        const album = await Albums.findById(req.params.id);
        if (album) {
            res.status(200).send(album);
        } else {
            res.status(404).send('No se encontró ese álbum');
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Algo salió mal :(');
    }
})

// 9) Borrar un álbum
router.delete('/:id', async (req, res) => {
    try {
        await Albums.findByIdAndDelete(req.params.id);
        res.status(200).send('Álbum eliminado correctamente');
    } catch (error) {
        res.status(500).send('Error al eliminar el álbum');
    }
})

module.exports = router;