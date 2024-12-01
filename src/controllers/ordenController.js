const Orden = require('../models/Orden')
// Get all Orders
const getOrdenes = async (req, res) => {
    try {
        const ordenes = await Orden.find();
        res.json(ordenes);
    }
    catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
};

// Get Order by ID
const getOrden = async (req, res) => {
    try {
        const orden = await Orden.findById(req.params.id);
        res.json(orden);
    }
    catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }

};

// Add a new Order
const addOrden = async (req, res) => {
    const { mesa, nroDeOrden, platillos, cantidades, estado } = req.body;
    try {
        let orden = new Orden({ mesa, nroDeOrden, platillos, cantidades, estado });
        orden = await orden.save();
        res.json(orden);
    }
    catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
};


// Update an existing Order
const updateOrden = async (req, res) => {
    const { fecha, total, cliente, mesero, productos } = req.body;
    const nuevaOrden = {};
    if (fecha) nuevaOrden.fecha = fecha;
    if (total) nuevaOrden.total = total;
    if (cliente) nuevaOrden.cliente = cliente;
    if (mesero) nuevaOrden.mesero = mesero;
    if (productos) nuevaOrden.productos = productos;
    try {
        let orden = await Orden.findById(req.params.id);
        if (!orden) {
            return res.status(404).json({ msg: 'Orden no encontrada' });
        }
        orden = await Orden.findByIdAndUpdate({ _id: req.params.id }, { $set: nuevaOrden }, { new: true });
        res.json(orden);
    }
    catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
};

// Delete a client
const delOrden = async (req, res) => {
    try {
        let orden = await Orden.findById(req.params.id);
        if (!orden) {
            return res.status(404).json({ msg: 'Orden no encontrada' });
        }
        await Orden.findByIdAndRemove({ _id: req.params.id });
        res.json({ msg: 'Orden eliminada' });
    }
    catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
    
};


module.exports = {
    getOrdenes,
    getOrden,
    addOrden,
    updateOrden,
    delOrden
}