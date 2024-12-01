const router = require('express').Router()

const { getMeseros, getMesero, addMesero, updateMesero, delMesero } = require('../controllers/meseroController')

router.get('/meseros', getMeseros)
router.get('/mesero/:id', getMesero)
router.post('/mesero', addMesero)
router.put('/mesero/:id', updateMesero)
router.delete('/mesero/:id', delMesero)


module.exports = router