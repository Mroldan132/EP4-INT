const { Schema, model } = require('mongoose')

const meseroSchema = new Schema({
    nombre: {type: String, required: true},
    apellido: {type: String, required: true},
    dni: {type: String, required: true},
    creado: {type: Date, default: Date.now()}
})

module.exports = model('Mesero', meseroSchema)
