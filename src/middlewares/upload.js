import multer from 'multer';

const storage = multer.memoryStorage(); // Almacena archivos en memoria
const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // Tamaño máximo de 5 MB
});

export default upload;
