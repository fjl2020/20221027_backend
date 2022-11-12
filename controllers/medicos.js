const {response} = require("express")
const Medico = require("../models/medicos")
const Hospital = require("../models/hospitales")

const getMedicos = async (req,res)=>{
    const medicos = await Medico.find({},"nombre img").populate('usuario','nombre').populate('hospitales','nombre')
    return res.status(200).json({
        ok:true,
        msg: medicos
    });


}

const crearMedico = async (req,res=response)=>{
    const uid=req.uid
    const {hospital,nombre} = req.body
    console.log(uid);
    try {
        // const hospitalDB = await Hospital.findById({hospital},"nombre")
        // console.log(hospitalDB);
        // if (!hospitalDB)    
        // {
        //     return res.status(400).json({
        //         ok:true,
        //         msg: 'El hospital no existe'
        //     });        
        // }
        const medicoDB = new Medico({usuario:uid,hospitales:hospital,...req.body})
        console.log(medicoDB);
        const medicoSaved=await medicoDB.save()

        return res.status(200).json({
            ok:true,
            msg: 'crear medicos',
            medico:medicoSaved
        });    
    } catch (error) {
        console.log(error)
        res.status(500).json("ocurrio un error consulte al admin")
    }
    


}
const actualizarMedico = async (req,res)=>{
    const {id}  =req.params
    console.log(`actualizar medico id ${id}`);
    const medicos = await Medico.find({})
    return res.status(200).json({
        ok:true,
        msg: `actualizar medico id ${id}`
    });


}
const borrarMedico = async (req,res)=>{
    // const {id}  =req.params
    const id = req.params.id
    console.log(`borrar id ${id}`);

    try {
        const medicoToDel = await Medico.findByIdAndDelete(id)
        if (!medicoToDel){
            return res.status(200).json({
                ok:true,
                msg: `El medico no se encontro`
            });    
        }
        return res.status(200).json({
            ok:true,
            msg: `se borro el medico id ${id}`
        });    
    } catch (error) {
        console.log(error)
        res.status(500).json("ocurrio un error consulte al admin")
    }
    


}

module.exports = {getMedicos,  crearMedico, actualizarMedico, borrarMedico}