const Categoria = require('../models/Categoria');

// Obtener todas las categorías
const getCategorias = async (req, res) => {

    try {
        const categorias = await Categoria.find();
        res.json(categorias);
    }
    catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
    
};

// Obtener una categoría por su ID
const getCategoria = async (req, res) => {
    console.log(req.params.id);
    try {
        const categoria = await Categoria.findById(req.params.id);
        res.json(categoria);
    }
    catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }

};

// Agregar una nueva categoría
const addCategoria = async (req, res) => {
    const { nombre, descripcion } = req.body;

    try {
        let existente = await Categoria.findOne({ nombre });
        if (!existente) {
            let categoria = new Categoria({ nombre, descripcion });
            categoria = await categoria.save();
            res.json(categoria);
        } else {
            return res.status(400).json({ msg: 'La categoría ya existe' });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }

};

// Actualizar una categoría existente
const updateCategoria = async (req, res) => {
    const { nombre } = req.body;
    const nuevaCategoria = {};
    if (nombre) nuevaCategoria.nombre = nombre;
    try {
        let categoria = await Categoria.findById(req.params.id);
        if (!categoria) {
            return res.status(404).json({ msg: 'Categoría no encontrada' });
        }
        categoria = await Categoria.findByIdAndUpdate({ _id: req.params.id }, { $set: nuevaCategoria }, { new: true });
        res.json(categoria);
    }
    catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
};

// Eliminar una categoría
const delCategoria = async (req, res) => {
    try {
        let categoria = await Categoria.findById(req.params.id);
        if (!categoria) {
            return res.status(404).json({ msg: 'Categoría no encontrada' });
        }
        await Categoria.findByIdAndRemove({ _id: req.params.id });
        res.json({ msg: 'Categoría eliminada' });
    }
    catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
};

module.exports = {
    getCategorias,
    getCategoria,
    addCategoria,
    updateCategoria,
    delCategoria
}