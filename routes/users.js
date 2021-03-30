const express = require('express');
const app = express();
const { getUserid, getAllUser, deleteUser , createUser } = require('../controllers/users');
const { validateToken } = require("../middlewares/auth")

app.get('/employee/:id',validateToken,getUserid)
app.get('/employees',validateToken,getAllUser)
app.delete('/delete/:id',validateToken,deleteUser)
app.post('/create', validateToken ,createUser)

module.exports = app