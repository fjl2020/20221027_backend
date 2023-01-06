const {response} = require('express')
const {validationResult}= require('express-validator')
const jwt = require('jsonwebtoken')
const Usuario = require('../models/usuario')
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

const validarAdminRole =async (req,res=response,next)=>{
    const uid=req.uid
    console.log(uid);
    try {
        const usuarioDB=await Usuario.findById(uid);
        console.log(usuarioDB.role);

        if (!usuarioDB){
            return res.status(404).json({
                ok:false,
                msg:'Usuario no encontrado'
            })}

        if (usuarioDB.role!=='ADMIN_ROLE'){
            return res.status(403).json({
                ok:false,
                msg:'Usuario no autorizado'
            })

        }else{
            next();
        }
        


     } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Hable con el administrador'
        })
     }
}
const validarAdminRole_O_mismo_usuario =async (req,res=response,next)=>{
    const uid=req.uid
    const id=req.params.id;

    try {
        const usuarioDB=await Usuario.findById(uid);

        if (!usuarioDB){
            return res.status(404).json({
                ok:false,
                msg:'Usuario no encontrado'
            })}
            
        if (usuarioDB.role==='ADMIN_ROLE' ||  uid===id){
            next();
            
        }else{
            return res.status(403).json({
                ok:false,
                msg:'Usuario no tiene los privilegios'
            })
        }
        


     } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Hable con el administrador'
        })
     }
}
module.exports =  {
    validarJwt,validarAdminRole,validarAdminRole_O_mismo_usuario
};