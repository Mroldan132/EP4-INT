const { Schema, model } = require('mongoose')

const clienteSchema = new Schema({
    nombre: {type: String, required: true},
    email: {type: String, required: true},
    telefono: {type: String, required: true},
    dni: {type: String, required: true},
    creado: {type: Date, default: Date.now()}
})

module.exports = model('Cliente', clienteSchema)