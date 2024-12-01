const router = require('express').Router()

const { getCategorias, getCategoria, addCategoria, updateCategoria, delCategoria } = require('../controllers/categoriaController')

router.get('/categorias', getCategorias)
router.get('/categoria/:id', getCategoria)
router.post('/categoria', addCategoria)
router.put('/categoria/:id', updateCategoria)
router.delete('/categoria/:id', delCategoria)

module.exports = router