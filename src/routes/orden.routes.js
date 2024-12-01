const router = require('express').Router()

const { getOrdenes, getOrden, addOrden, updateOrden, delOrden } = require('../controllers/ordenController')

router.get('/ordenes', getOrdenes)
router.get('/orden/:id', getOrden)
router.post('/orden', addOrden)
router.put('/orden/:id', updateOrden)
router.delete('/orden/:id', delOrden)

module.exports = router