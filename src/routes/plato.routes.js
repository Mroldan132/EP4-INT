const router = require('express').Router()

const { getPlatos, getPlato, addPlato, updatePlato, delPlato } = require('../controllers/platoController')

router.get('/platos', getPlatos)
router.get('/plato/:id', getPlato)
router.post('/plato', addPlato)
router.put('/plato/:id', updatePlato)
router.delete('/plato/:id', delPlato)

module.exports = router