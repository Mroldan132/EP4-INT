const Mesero = require('../models/Mesero');

// Get all clients
const getMeseros = async (req, res) => {
    try {
        const meseros = await Mesero.find();
        res.json(meseros);
    }
    catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
};

// Get client by ID
const getMesero = async (req, res) => {
    try {
        const mesero = await Mesero.findById(req.params.id);
        res.json(mesero);
    }
    catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
};

// Add a new client
const addMesero = async (req, res) => {
    const { nombre, apellido, dni, telefono } = req.body;
    try {
        let existente = await Mesero.findOne({ dni });
        if (!existente) {
            let mesero = new Mesero({ nombre, apellido, dni, telefono });
            mesero = await mesero.save();
            res.json(mesero);
        } else {
            return res.status(400).json({ msg: 'El mesero ya existe' });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
};

// Update an existing mesero
const updateMesero = async (req, res) => {
    const { nombre, apellido, dni, telefono } = req.body;
    const nuevoMesero = {};
    if (nombre) nuevoMesero.nombre = nombre;
    if (apellido) nuevoMesero.apellido = apellido;
    if (dni) nuevoMesero.dni = dni;
    if (telefono) nuevoMesero.telefono = telefono;
    try {
        let mesero = await Mesero.findById(req.params.id);
        if (!mesero) {
            return res.status(404).json({ msg: 'Mesero no encontrado' });
        }
        mesero = await Mesero.findByIdAndUpdate({ _id: req.params.id }, { $set: nuevoMesero }, { new: true });
        res.json(mesero);
    }
    catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
};

// Delete a client
const delMesero = async (req, res) => {
    try {
        let mesero = await Mesero.findById(req.params.id);
        if (!mesero) {
            return res.status(404).json({ msg: 'Mesero no encontrado' });
        }
        await Mesero.findByIdAndRemove({ _id: req.params.id });
        res.json({ msg: 'Mesero eliminado' });
    }
    catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
};

module.exports = {
    getMeseros,
    getMesero,
    addMesero,
    updateMesero,
    delMesero
}

