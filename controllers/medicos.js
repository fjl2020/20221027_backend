const {response} = require("express")
const Medico = require("../models/medicos")

const getMedicos = async (req,res)=>{
    const medicos = await Medico.find({},"nombre img").populate('usuario','nombre').populate('hospital','nombre')
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
    const {id}  = req.params
    const uid= req.uid;
    if (id && id.length !==24){
      return res.status(404).json({
        ok: false,
        msg: "El id no es valido",
      });
    }
    try {
      const medicodb= await Medico.findById(id);
        console.log(medicodb.nombre,req.body.nombre)
      if (!medicodb){
        return res.status(400).json({
          ok: true,
          msg: `Medico no encontrado`
        });    
      }
      
      const cambiosMedico = {
        ...req.body,
        usuario:uid,
      }
      
      const medicoActualizado = await Medico.findByIdAndUpdate(id, cambiosMedico, {
        new: true,
      });
      console.log(medicoActualizado.nombre,req.body.nombre)
      return res.status(200).json({
        ok: true,
        msg: medicoActualizado//`actualizar id hospital ${id}`
      });  
    } catch (error) {
        console.log(error)
        return res.status(500).json({
          ok: false,
          msg:'error al editar medico llame al admin'
        });  
    }
}
const borrarMedico = async (req,res)=>{
    const {id}  = req.params

    try {
      const medicoDel = await Medico.findByIdAndDelete(id)
      if (!medicoDel){
        return res.status(400).json({
          ok: true,
          msg: `Medico no encontrado`
        });  
      }
      return res.status(200).json({
        ok: true,
        msg : `Se borro el Medico`
    })
    } catch (error) {
      console.log(error)
      return res.status(500).json({
        ok: false,
        msg:'error al editar Medico llame al admin'
      });  
      
    }

}

module.exports = {getMedicos,  crearMedico, actualizarMedico, borrarMedico}