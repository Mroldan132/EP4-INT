const express = require('express')
const router = express.Router()

const meseroRoutes = require('./mesero.routes')
const clienteRoutes = require('./cliente.routes')
const ordenRoutes = require('./orden.routes')
const platoRoutes = require('./plato.routes')
const categoriaRoutes = require('./categoria.routes')

router.use(meseroRoutes)
router.use(clienteRoutes)
router.use(ordenRoutes)
router.use(platoRoutes)
router.use(categoriaRoutes)

module.exports = router