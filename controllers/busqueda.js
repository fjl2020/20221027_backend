const {response} = require('express')
const Hospital = require('../models/hospitales')
const medicos = require('../models/medicos')
const Medico = require('../models/medicos')
const Usuario = require('../models/usuario')

const getTodo = async (req,res=response)=>{
    const buscarArg=req.params.buscarArg
    const regex =new RegExp(buscarArg,'i')

    const [usuario,medico,hospital] = await Promise.all([
        Usuario.find({
            nombre : regex
        },'nombre'),
        Medico.find({
            nombre : regex
        }).populate('usuario','nombre').populate('hospitales','nombre'),

        Hospital.find({
            nombre : regex
        }).populate('usuario','nombre')
    ])


    return res.status(200).json({
        ok:true,
        msg:buscarArg,
        usuario,
        medico,
        hospital
    })
}
const getTodoByCol = async (req,res=response)=>{
    const buscarArg=req.params.buscarArg
    const tabla=req.params.tabla
    const regex =new RegExp(buscarArg,'i')
    console.log(tabla);
    let busq=[];
    switch(tabla){

        case 'usuarios':
            busq= await Usuario.find({
                nombre : regex
            },'nombre');

            break;
        case 'medicos':
            busq= await Medico.find({
                nombre : regex
            },'nombre').populate('usuario','nombre').populate('hospitales','nombre');
            break;
        case 'hospitales':
            busq= await Hospital.find({
                nombre : regex
            },'nombre').populate('usuario','nombre');
            break;
        default:
            return res.status(400).json({
                ok:false,
                msg: 'La tabla debe ser usuarios/hospitales/medicos '
            })
    }

    return res.status(200).json({
        ok:true,
        msg:buscarArg,
        coleccion:tabla,
        busq
    })
}

module.exports = {getTodo,getTodoByCol}