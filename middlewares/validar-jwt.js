const {response} = require('express')
const {validationResult}= require('express-validator')
const jwt = require('jsonwebtoken')

const validarJwt = (req,res=response,next) => {


    //leer el token
    const token = req.header('x-token')
    
    if (!token) {
        return res.status(401).json({
            ok:false,
            msg : 'No hay token'
        });
    }
    try {
        const {uid} = jwt.verify(token,process.env.JWT_SECRET)
        req.uid=uid;
        next();
        
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            ok:false,
            msg: 'Token verify error'
        })
    }
    

   
}


module.exports =  {
    validarJwt
};