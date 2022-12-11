const { response } = require("express");
const { v4: uuidv4 } = require("uuid");
const { actualizarImagen } = require("../helpers/actulizar-imagen");
const path = require("path");
const fs = require("fs");

const fileUpload = async (req, res = response) => {
  const tipo = req.params.tipo;
  const id = req.params.id;

  const tiposValidos = ["hospitales", "medicos", "usuarios"];
  if (!tiposValidos.includes(tipo)) {
    return res.status(400).json({
      ok: false,
      msg: "No es un tipo de coleccion válido (medicos/hospitales/usuarios)",
    });
  }

  //checuea longitud de id medico
  if (id.length != 24) {
    return res.status(400).json({
      ok: false,
      msg: `id de ${tipo} no válido`,
    });
  }
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({
      ok: false,
      msg: "No hay archivo adjuntado",
    });
  }

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file

  const file = req.files.imagen;
  const extensionfile = file.name.split(".")[1] || "";
  const extensionesPermitidas = ["png", "jpg", "jpeg", "gif"];

  if (!extensionesPermitidas.includes(extensionfile)) {
    return res.status(400).json({
      ok: false,
      msg: "No es un tipo de extensión permitidas (png/jpg/jpeg/gif)",
    });
  }
  //   console.log(sampleFile)
  const fileName = `${uuidv4()}.${extensionfile}`;
  uploadPath = `./uploads/${tipo}/` + fileName;
  //   console.log(uploadPath);
  //   // Use the mv() method to place the file somewhere on your server
  if (!(await actualizarImagen(tipo, id, fileName))) {
    return res.status(500).json({
      ok: false,
      msg: `error actualizar ${tipo}`,
    });
  }
  file.mv(uploadPath, (error) => {
    if (error) {
      console.log(error);
      return res.status(500).json({
        ok: false,
        msg: "error al mover la imagen",
      });
    }

    res.status(200).json({
      ok: true,
      msg: "archivo subido",
      archivo: fileName,
      tipo,
      id,
    });
  });
};
const retornaImagen = async (req, res = response) => {
  const archivo = req.params.foto;
  const tipo = req.params.tipo;
  const pathImg = path.join(__dirname, `../uploads/${tipo}/${archivo}`);
  console.log(pathImg);

  const tiposValidos = ["hospitales", "medicos", "usuarios"];
  if (!tiposValidos.includes(tipo)) {
    return res.status(400).json({
      ok: false,
      msg: "No es un tipo de coleccion válido (medicos/hospitales/usuarios)",
    });
    
  }
  if (fs.existsSync(pathImg)) {
    res.sendFile(pathImg);
  } else {
    return res.sendFile(path.join(__dirname, `../uploads/noimage.jpg`));
  }
};

module.exports = { fileUpload, retornaImagen };
