const Hospital = require("../models/hospitales");
const { response } = require("express");

const getHospitales = async (req, res) => {
  const hospitales = await Hospital.find({}, "nombre img").populate('usuario','nombre email')
  console.log(hospitales);
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
        hospital : hospital_saved
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
    const uid= req.uid;
    if (id && id.length !==24){
      return res.status(404).json({
        ok: false,
        msg: "El id no es valido",
      });
    }
    try {
      const hospitaldb= await Hospital.findById(id);

      if (!hospitaldb){
        return res.status(400).json({
          ok: true,
          msg: `Hospital no encontrado`
        });    
      }
      
      const cambiosHospital = {
        ...req.body,
        usuario:uid,
      }
      
      const hospitalActualizado = await Hospital.findByIdAndUpdate(id, cambiosHospital, {
        new: true,
      });

      return res.status(200).json({
        ok: true,
        msg: hospitalActualizado//`actualizar id hospital ${id}`
      });  
    } catch (error) {
        console.log(error)
        return res.status(500).json({
          ok: false,
          msg:'error al editar hospital llame al admin'
        });  
    }
    
  };

  const borrarHospital = async ( req,res)=>{
    const {id}  = req.params

    
    console.log(`del id hospital ${id}`);
    
    try {
      const hospitalDel = await Hospital.findByIdAndDelete(id)
      if (!hospitalDel){
        return res.status(400).json({
          ok: true,
          msg: `Hospital no encontrado`
        });  
      }
      return res.status(200).json({
        ok: true,
        msg : `Se borro el hostpital`
    })
    } catch (error) {
      console.log(error)
      return res.status(500).json({
        ok: false,
        msg:'error al editar hospital llame al admin'
      });  
      
    }
 
    
  }
module.exports = {getHospitales, crearHospital, actualizarHospital, borrarHospital}