const Usuario = require("../models/usuario");
const Medico = require("../models/medicos");
const Hospital = require("../models/hospitales");
const fs = require("fs");
const path = require("path");



const borrarImg  = (pathViejo)=>{
    if (fs.existsSync(pathViejo)) {
        fs.unlinkSync(pathViejo); //borro la imagen anterior
      }
}
const actualizarImagen = async (tipo, id, filename) => {

    try {
        let pathViejo=null;
        switch (tipo) {
          case "medicos":
            const medico = await Medico.findById(id);
      
            if (!medico) {
              return false;
            }
            pathViejo = `./uploads/medicos/${medico.img}`;
            borrarImg(pathViejo);
            medico.img = filename;
            medico.save();
      
            break;
          case "usuarios":
            const usuario = await Usuario.findById(id);
      
            if (!usuario) {
              return false;
            }
            pathViejo = `./uploads/usuarios/${usuario.img}`;
            borrarImg(pathViejo);
            usuario.img = filename;
            usuario.save();
      
            break;
          case "hospitales":
              const hospitales = await Hospital.findById(id);
      
              if (!hospitales) {
                return false;
              }
              pathViejo = `./uploads/hospitales/${hospitales.img}`;
              borrarImg(pathViejo);
              hospitales.img = filename;
              hospitales.save();
        
              break;
        }
    } catch (error) {
        console.log(error);
        return false;
    }
    return true;      
  
};

module.exports = { actualizarImagen };
