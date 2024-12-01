const jwt = require('jsonwebtoken')
const secret = require('../config/global').secret 

function createAccessToken(payload){
    return new Promise((resolve, reject) => {
        jwt.sign(
            payload,
            secret,
            {
                expiresIn: "1d"
            }
            , (err, token) => {
                if(err) reject(err)
                resolve(token)
            }
        )
    })
}

//exportar la funcion
module.exports = {
    createAccessToken
}