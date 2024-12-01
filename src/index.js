const express = require('express')
const conectarDB = require('./config/db')
const config = require('./config/global')
const cors = require('cors')
const rutas = require('./routes/index')

const app = express()

conectarDB()

app.use(cors())
app.use(express.json())
app.use('/api', rutas)

app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
    res.send('API REST de Tagliateri')
})


app.listen(config.port, () => {
    console.log('El servidor corriendo por el puerto 5000')
})