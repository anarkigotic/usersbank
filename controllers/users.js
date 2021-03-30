'use strict'
const { getEmployedById, getEmployes, deleteEmployes , createEmployed } = require("../storage/index")
const { responseService } = require("../model/response")



const getUserid = (req, res) => {
    try {
        const id = req.params.id;
        let employed = getEmployedById(id)
        return responseService(res,200,"HU1",employed)
    } catch (error) {
        const { message, status } = (JSON.parse(error.message));
        return responseService(res,status,"faild",message)
    }


}
const getAllUser = (req, res) => {
    try {
        let employees = getEmployes()
        return responseService(res,200,"HU1",employees);
    } catch (error) {
        const { message, status } = (JSON.parse(error.message));
        return responseService(res,status,"faild",message)
    }


}
const deleteUser = (req, res) => {
    try {
        const id = req.params.id;
        let user = deleteEmployes(id)
        return responseService(res,200,"OK_DELETE",user);
    } catch (error) {
        const { message, status } = (JSON.parse(error.message));
        return responseService(res,status,"faild",message)
    }
}
const createUser = async(req, res) => {
    try {
        let { name , lastName , email , password } = req.body;
        let user =  { name, lastName, email, password };
        user = await createEmployed(user);
        return responseService(res,200,"OK_CREATE",user);
    } catch (error) {
        const { message, status } = (JSON.parse(error.message));
        return responseService(res,status,"faild",message)
    }
}

module.exports = {
    getUserid,
    getAllUser,
    deleteUser,
    createUser
}
