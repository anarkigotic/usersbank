
'use strict'
const fs = require('fs')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const saltRounds = 10;

const createToken = () => {
    let privateKey = fs.readFileSync('./certificates/app.rsa');
    return jwt.sign({ user: 'scotiback' },
        privateKey, { algorithm: 'RS256', expiresIn: '1h' });

}

const comparePass = async(pass,hash)=> await bcrypt.compare(pass,hash);

const generatePass = async(pass)=>{
    let salt = await bcrypt.genSalt(saltRounds);
    return await bcrypt.hash(pass,salt);

}

module.exports = {
    createToken,
    comparePass,
    generatePass
}