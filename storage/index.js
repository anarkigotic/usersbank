'use strict'
const fs = require('fs');
const { generatePass } = require("../utils/auth");
const {validateUser}  = require("../model/user")

let data = JSON.parse(fs.readFileSync('./storage/employes.json'));



const getEmployedById = (id) => {
    id = Number(id);
    let employed = data.some(ele => ele.id === id)
    if (!employed) {
        throw new Error(JSON.stringify({
            message: "no se encontro empleado",
            status: 500
        }));
    }
    employed = data.find(ele => ele.id === id)
    delete employed.password;
    return employed
}
const findOne = (email) => {
    let employed = data.some(ele => ele.email === email)
    if (!employed) {
        throw new Error(JSON.stringify({
            message: "no se encontro empleado con ese correo",
            status: 500
        }));
    }
    employed = data.find(ele => ele.email === email)
    return employed
}
const getEmployes = (req, res) => {
    if (data.lenght <= 0) {
        throw new Error(JSON.stringify({
            message: "no se encontro empleados creados",
            status: 500
        }));
    }
    return data;
}
const deleteEmployes = (id) => {
    let employed = data.some(ele => ele.id === Number(id))
    if (!employed) {
        throw new Error(JSON.stringify({
            message: "no se encontro empleado con ese id",
            status: 500
        }));
    }
    data = data.filter(ele => ele.id != id);
    return "empleado borrado correctamente"
}


const createEmployed = async(employed) => {
    let lastId = (data[data.length - 1]?.id || 0);
    lastId += 1;
    employed.id = lastId;
    employed.password = await generatePass(employed.password);
    let validation = validateUser(employed);
    console.log(4,validation);
    if(validation.length > 0){
        throw new Error(JSON.stringify({
            message: {
                info : "error al crear usuario",
                validation
            },
            status: 500
        }));
    }
    data = [...data, employed]
    return "empleado guardado con exito"
}

module.exports = {
    getEmployedById,
    getEmployes,
    deleteEmployes,
    createEmployed,
    findOne
}