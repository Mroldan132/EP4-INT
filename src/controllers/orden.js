import { getConnection } from "./../database/database";

// Get all Orders
const getOrdenes = async (req, res) => {
    try {
        const connection = await getConnection();
        const result = await connection.query("SELECT * from orden");
        console.log(result);
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

// Get Order by ID
const getOrden = async (req, res) => {
    try {
        const { id } = req.body;
        const connection = await getConnection();
        const result = await connection.query("SELECT O.idorden, O.idcliente, P.nombre, D.cantidad ,O.total,O.estado from orden O inner JOIN detallesorden D On O.idorden = D.idorden INNER JOIN plato P ON D.idplato = P.idplato WHERE O.idorden = ?", id);
        console.log(result);
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

// Add a new Order
const addOrden = async (req, res) => {
    try {
        const { idcliente, platos, cantidades } = req.body;

        if (!idcliente || !platos || !cantidades || platos.length !== cantidades.length) {
            return res.status(400).json({ "message": "Bad Request. Please fill all fields correctly." });
        }

        const connection = await getConnection();

        const result = await connection.query("INSERT INTO orden (idcliente, total, estado) VALUES (?, 0, 'pendiente')", [idcliente]);
        const idorden = result.insertId;
        console.log(`Inserted order with ID: ${idorden}`);

        for (let i = 0; i < platos.length; i++) {
            await connection.query("INSERT INTO detallesorden (idplato, cantidad, idorden) VALUES (?, ?, ?)", [platos[i], cantidades[i], idorden]);
            console.log(`Inserted detail for order ID: ${idorden}, plato ID: ${platos[i]}, quantity: ${cantidades[i]}`);
        }

        res.json({ "message": "Orden Registrada Correctamente" });
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
};


// Update an existing Order
const updateOrden = async (req, res) => {
    try {
        const { id } = req.body;
        const { estado } = req.body;

        if (!estado) {
            return res.status(400).json({ "message": "Bad Request. Please provide estado." });
        }

        const connection = await getConnection();
        const result = await connection.query(`UPDATE orden SET estado = '${estado}' WHERE idorden = '${id}'`);
        res.json({ "message": "Estado de Orden Actualizado Correctamente" });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Delete a client
const delOrden = async (req, res) => {
    try {
        const { id } = req.body;
        const connection = await getConnection();
        await connection.query("DELETE FROM detallesorden WHERE idorden = ?", id);
        await connection.query("DELETE FROM orden WHERE idorden = ?", id);
        res.json({ "message": "Orden Eliminada Correctamente" });
    } catch (error) {
        res.status(500).send(error.message);
    }
};
export const methods = {
    getOrdenes,
    getOrden,
    addOrden,
    updateOrden,
    delOrden
};
