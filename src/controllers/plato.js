import { getConnection } from "../database/database";

// Get all products
const getPlatos = async (req, res) => {
    try {
        const connection = await getConnection();
        const result = await connection.query("SELECT P.idplato, P.nombre as Plato, P.ingredientes, C.nombre as Categoria, P.precio from plato P inner join categoria C on P.idcategoria = C.idcategoria;");
        console.log(result);
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

// Get product by ID
const getPlato = async (req, res) => {
    try {
        const { id } = req.body;
        const connection = await getConnection();
        const result = await connection.query("SELECT P.idplato, P.nombre as Plato, P.ingredientes, C.nombre as Categoria, P.precio from plato P inner join categoria C on P.idcategoria = C.idcategoria WHERE P.idplato = ?", id);
        console.log(result);
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

// Add a new product
const addPlato = async (req, res) => {
    try {
        const { nombre, ingredientes, categoria, imagen,  precio } = req.body;
        
        if (nombre === undefined || ingredientes === undefined || categoria === undefined || imagen === undefined || precio === undefined ) {
            res.status(400).json({ "message": "Bad Request. Please fill all fields." });
        }

        const connection = await getConnection();
        const result = await connection.query(`INSERT INTO plato (nombre, ingredientes, idcategoria, imagen, precio)
                                                VALUES ('${nombre}', '${ingredientes}','${categoria}','${imagen}','${precio}')`);
        res.json({ "message": "Producto Registrado Correctamente" });
        
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

// Update an existing product
const updatePlato = async (req, res) => {
    try {
        const { id, nombre, ingredientes, categoria, imagen,  precio } = req.body;
        if (id === undefined || nombre === undefined || ingredientes === undefined || precio === undefined || imagen === undefined || categoria === undefined) {
            res.status(400).json({ "message": "Bad Request. Please fill all fields." });
        }
        const connection = await getConnection();
        const result = await connection.query(`UPDATE producto SET nombre = '${nombre}',
                                                ingredientes = '${ingredientes}', 
                                                idcategoria = '${categoria}',
                                                precio = '${precio}',
                                                imagen = '${imagen}'
                                                WHERE idplato = '${id}'`);
        res.status(200).json({ "message": "Producto Actualizado Correctamente" });
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};


// Delete a product
const delPlato = async (req, res) => {
    try {
        const { id } = req.body;
        if (id === undefined) {
            res.status(400).json({ "message": "Bad Request. Please provide an id." });
        }
        const connection = await getConnection();
        const result = await connection.query("DELETE FROM plato WHERE idplato = ?", id);
        res.status(200).json({ "message": "Producto Eliminado Correctamente" });
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};


export const methods = {
    getPlatos,
    getPlato,
    addPlato,
    updatePlato,
    delPlato
};
