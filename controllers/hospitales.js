const Hospital = require("../models/hospitales");
const { response } = require("express");

const getHospitales = async (req, res) => {
  const hospitales = await Hospital.find({}, "nombre img").populate('usuario','nombre email')
  return res.status(200).json({
    ok: true,
    hospitales,
    uid:req.uid
  });
};
const crearHospital = async (req, res) => {
  const uid= req.uid;
  
  const hospital = new Hospital({
    usuario : uid,...req.body}); 
    try {
      const hospital_saved = await hospital.save();
      return res.status(200).json({
        ok: true,
        msg: 'Usuario Creado',
        Hospital : hospital_saved
    });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        ok : false,
        msg : 'Error hable con el admin'
      })
    }

    
  };

  const actualizarHospital = async (req, res) => {
    const {id}  = req.params
    console.log(`actualizar id hospital ${id}`);
    return res.status(200).json({
      ok: true,
      msg: `actualizar id hospital ${id}`
    });
  };
  const borrarHospital = async ( req,res)=>{
    const {id}  = req.params
    console.log(`del id hospital ${id}`);
    return res.status(200).json({
        ok: true,
        msg : `del id hospital ${id}`
    })
    
  }
module.exports = {getHospitales, crearHospital, actualizarHospital, borrarHospital}