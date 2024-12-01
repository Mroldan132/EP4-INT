const router = require('express').Router()

const { getCliente, getClientes, addCliente, updateCliente, delCliente } = require('../controllers/clienteController')

router.get('/clientes', getClientes)
router.get('/cliente/:id', getCliente)
router.post('/cliente', addCliente)
router.put('/cliente/:id', updateCliente)
router.delete('/cliente/:id', delCliente)

module.exports = router