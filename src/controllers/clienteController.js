const Cliente = require('../models/Cliente');

// Get all clients
const getClientes = async (req, res) => {
    try {
        const clientes = await Cliente.find();
        res.json(clientes);
    }
    catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
};

// Get client by ID
const getCliente = async (req, res) => {
    try {
        const cliente = await Cliente.findById(req.params.id);
        res.json(cliente);
    }
    catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
};

// Add a new client
const addCliente = async (req, res) => {
    const { nombre, dni, email, telefono } = req.body;
    try {
        let existente = await Cliente.findOne({dni});
        if (!existente) {
            let cliente = new Cliente({ nombre, email, telefono , dni});
            cliente = await cliente.save();
            res.json(cliente);
        }
        else {
            return res.status(400).json({ msg: 'Cliente ya existe' });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
};

// Update an existing client
const updateCliente = async (req, res) => {
    const { nombre, dni, email, telefono } = req.body;
    const nuevoCliente = {};
    if (nombre) nuevoCliente.nombre = nombre;
    if (telefono) nuevoCliente.telefono = telefono;
    if (email) nuevoCliente.email = email;
    if (dni) nuevoCliente.dni = dni;
    try {
        let cliente = await Cliente.findById(req.params.id);
        if (!cliente) {
            return res.status(404).json({ msg: 'Cliente no encontrado' });
        }
        cliente = await Cliente.findByIdAndUpdate({ _id: req.params.id }, { $set: nuevoCliente }, { new: true });
        res.json(cliente);
    }
    catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
};

// Delete a client
const delCliente = async (req, res) => {
    try {
        let cliente = await Cliente.findById(req.params.id);
        if (!cliente) {
            return res.status(404).json({ msg: 'Cliente no encontrado' });
        }
        await Cliente.findByIdAndRemove({ _id: req.params.id });
        res.json({ msg: 'Cliente eliminado' });
    }
    catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
};

module.exports = {
    getClientes,
    getCliente,
    addCliente,
    updateCliente,
    delCliente
}
