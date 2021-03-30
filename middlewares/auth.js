'use strict'
const fs = require('fs');
const jwt = require('jsonwebtoken');


const validateToken = (req, res, next) => {
    try {
        let publicKey = fs.readFileSync('./certificates/app.rsa.pub');
        let { token } = req.headers;
        jwt.verify(token, publicKey);
        next();
    } catch (error) {
        res.status(500).json({
            message: 'Error al buscar usuarios',
            errors: error.message
        })
    }

}

module.exports = {
    validateToken
}