import { getConnection } from "../database/database";
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const fs = require('fs').promises;

// Get all products
const getPlatos = async (req, res) => {
    try {
        const connection = await getConnection();
        const result = await connection.query("SELECT P.idplato, P.nombre as Plato, P.ingredientes, C.nombre as Categoria, P.precio from plato P inner join categoria C on P.idcategoria = C.idcategoria;");
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

// Get product by ID
const getPlato = async (req, res) => {
    try {
        const { id } = req.params;
        const connection = await getConnection();

        const [plato] = await connection.query(
            `SELECT P.idplato, P.nombre as Plato, P.ingredientes, P.idcategoria as codigoCategoria, P.precio,P.imagen from plato P inner join categoria C on P.idcategoria = C.idcategoria WHERE P.idplato = ?`,
            [id]
        );
        if (!plato) {
            return res.status(404).json({ message: "Plato no encontrado" });
        }
        let imagenBase64 = 'iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAOVBMVEXz9Pa5vsq2u8jN0dnV2N/o6u7w8fTi5OnFydO+ws3f4ee6v8vY2+H29/jy9Pbu7/LJztbCx9HR1ty/NMEIAAACq0lEQVR42u3cYXaqMBBA4cyEgEAi4P4X+34oLSra9IA9E979FtDj7SAJUOocAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAqrQ3Y311iH5fsaktBTYn3d/Y2JljlM/orAR2IsdOHNqPFbY2TqKdXj/Orl/C24/sLHwV0ygiIv2466n0+kNlNFHYiohotfNyWKmIyKm2U9jsffqyU+gopLDMwiGE+sCFjRdV1SkOxyw8X2Rer6cNe2e7hfVJv3ddGg9YeNHlxrIPhyvs9GHvXB+sMJ2eLoDSsQrDwwhF/cFm+HiQikxvP+Prk63RwhSfCtt3i6J/fbK1Wlj9qvCiIjEd9yg9e32zZFotHPLPNOd55VyfotnVYsq9XVZ7fbvxsbviZx6kZ7+Y9toU7e7a/P1x+mI5qP3doRyLuraYlokxY4LrUzRcOPj56knaxmVMcP1XYfkKODW+VVWZqiHlTXBtisbvYgwhhKF22RNcmWLBd6JWJ/g8xXIL64u+eg5zl1huodfXj5riAQrPF333NG0xxVILvb5/YBhLKxzC8+XSD4mpqMLQt2F59hj158e+saDCFFrRacj9Dj5MsYTC0IuIfk9xzAoU7QopTKG93dq/7d3yJiiiVSqjMPTzJ25Dcu6cOUERjUUUzhP8mmLuBIsp/Jrg9Soq+OzAMgqXE7wm/uKvhIoovJ/gLxVQ+DTBwxVummABhRsnWEDhxgmaL9w8QfOFmydovTDlb11KLawopJBCCimk8E8Kbd+nGcJ2Q9F39fNRSKH5wtSZeyvI7/sm8O053MnCCOc/C/7Iu2vexIuyn3z/sLEQ6Orp4O+QOtf0HwrsGyOFrhP9QJ+qmUDnwtju/jp+PwZT/1chdNW+YuMAAAAAAAAAAAAAAAAAAAAAAAAAAACA/9s/LTI30XlcBHoAAAAASUVORK5CYII=';
        if (plato.imagen && plato.imagen.length > 0) {
            imagenBase64 = plato.imagen.toString('base64');
        }

        return res.status(200).json({
            ...plato,
            imagen: `data:image/jpeg;base64,${imagenBase64}`
        });
    } catch (error) {
        return res.status(500).json({error: error.message });
    }
};

// Add a new product
const addPlato = async (req, res) => {
    try {
        const {nombre, ingredientes, categoria, precio,flgImagen} = req.body;
        
        if (nombre === undefined || ingredientes === undefined || categoria === undefined || precio === undefined ) {
            res.status(400).json({ "message": "Bad Request. Please fill all fields." });
        }
        
        let imageBytes = null;
        if (req.file) {
            imageBytes = req.file.buffer; 
        }

        const connection = await getConnection();

        const result = await connection.query(
            `INSERT INTO plato (nombre, ingredientes, idcategoria, imagen, precio)
             VALUES (?, ?, ?, ?, ?)`,
            [nombre, ingredientes, categoria, imageBytes, precio]
        );

        return res.status(201).json({ "message": "Plato Registrado Correctamente" });
        
    } catch (error) {
         return res.status(500).json({ message: 'Error al registrar el plato', error: error.message });
    }
};

// Update an existing product
const updatePlato = async (req, res) => {
    try {
        const { id, nombre, ingredientes, categoria, precio ,flgImagen} = req.body;

        if (nombre === undefined || ingredientes === undefined || categoria === undefined || precio === undefined ) {
            res.status(400).json({ "message": "Bad Request. Please fill all fields." });
        }

        let imageBytes = null;
        if (req.file) {
            imageBytes = req.file.buffer; 
        }

        const connection = await getConnection();
        const result = await connection.query(
            `UPDATE plato  
             SET nombre = ?, 
                 ingredientes = ?, 
                 idcategoria = ?, 
                 precio = ?, 
                 imagen = CASE WHEN ? = 'S' THEN ? ELSE imagen END 
             WHERE idplato = ?`,
            [nombre, ingredientes, categoria, precio, flgImagen, imageBytes, id]
        );
        return res.status(200).json({ message: "Plato actualizado correctamente." });
    } catch (error) {
        console.error('Error al actualizar el plato:', error);
        return res.status(500).json({ message: 'Error al actualizar el plato', error: error.message });
    }
};


// Delete a product
const delPlato = async (req, res) => {
    try {
        const { id } = req.params;
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
