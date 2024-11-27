import { getConnection } from "./../database/database";

// Get all clients
const getMeseros = async (req, res) => {
    try {
        const connection = await getConnection();
        const result = await connection.query("SELECT * from mesero");
        console.log(result);
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

// Get client by ID
const getMesero = async (req, res) => {
    try {
        const { id } = req.params;
        const connection = await getConnection();
        const result = await connection.query("SELECT * from mesero WHERE idmesero = ?", id);
        console.log(result);
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

// Add a new client
const addMesero = async (req, res) => {
    try {
        const { nombre, email, telefono} = req.body;
        
        if (nombre === undefined || email === undefined || telefono === undefined) {
            res.status(400).json({ "message": "Bad Request. Please fill all fields." });
        }

        const connection = await getConnection();
        const result = await connection.query(`INSERT INTO mesero (nombre, email, telefono)
                                                VALUES ('${nombre}', '${email}', '${telefono}')`);
        res.json({ "message": "Mesero Registrado Correctamente" });
        
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

// Update an existing mesero
const updateMesero = async (req, res) => {
    try {
        const { id, nombre, email, telefono} = req.body;
        if (id === undefined || nombre === undefined || email === undefined || telefono === undefined) {
            res.status(400).json({ "message": "Bad Request. Please fill all fields." });
        }
        const connection = await getConnection();
        const result = await connection.query(`UPDATE mesero SET nombre = '${nombre}', 
                                                email = '${email}', 
                                                telefono = '${telefono}' 
                                                WHERE idmesero = ${id}`);
        res.status(200).json({ "message": "Mesero Actualizado Correctamente" });
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

// Delete a client
const delMesero = async (req, res) => {
    try {
        const { id } = req.params;
        if (id === undefined) {
            res.status(400).json({ "message": "Bad Request. Please provide an id." });
        }
        const connection = await getConnection();
        const result = await connection.query("DELETE FROM mesero WHERE idmesero = ?", id);
        res.status(200).json({ "message": "Mesero Eliminado Correctamente" });
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

export const methods = {
    getMeseros,
    getMesero,
    addMesero,
    updateMesero,
    delMesero
};
