'use strict'
const { findOne } = require("../storage/index")
const { comparePass , createToken} = require("../utils/auth")
const { responseService } = require("../model/response")




const loginUser = async(req, res) => {
    try {
        const body = req.body;
        const { password,id } = findOne(body.email);
        let pass = await comparePass(body.password, password);
        if(!pass){
            throw new Error(JSON.stringify({
                message : "credencailes invalidas",
                status : 500
            }));
        }
        const token = createToken()
        return responseService(res,200,"HU",{token,id});
    } catch (error) {
        console.log(" un error ",error);
        const { message, status } = (JSON.parse(error.message));
        return res.status(status).json({ message })
    }


}

module.exports = {
    loginUser
}