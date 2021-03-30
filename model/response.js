let response = {
    status : 200,
    code : 'OK',
    data : {}
}



const responseService = (res,status=200,code,data)=> {
   return res.status(status).json({...response,code,data})
}
        


module.exports = {
    responseService
}