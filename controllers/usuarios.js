const Usuario = require("../models/usuario");
const { response } = require("express");
const bcrypt = require("bcryptjs");
const { generarJWT } = require("../helpers/jwt");

const getUsuarios = async (req, res) => {
  const desde = Number(req.query.desde) || 0 
  // console.log(desde);
  // const usuarios = await Usuario.find({}, "nombre email role google").skip(desde).limit(5);
  // const total =  await Usuario.count()


  const [usuarios,total] = await Promise.all([
    Usuario.find({}, "nombre email role google img").skip(desde).limit(5),
    Usuario.countDocuments()
  ])
  return res.status(200).json({
    ok: true,
    usuarios,
    total

  });
};
const crearUsuario = async (req, res = response) => {
  // console.log(req.body);
  const { nombre, password, email } = req.body;

  try {
    const existeEmail = await Usuario.findOne({ email });

    if (existeEmail) {
      return res.status(400).json({
        ok: false,
        msg: "El correo ya esta registrado",
      });
    }

    const usuario = new Usuario(req.body);

    //encriptar contraseña
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);


    // Guardar usuario.
    await usuario.save();
    
    const token=await  generarJWT(usuario.id)
    res.status(200).json({
      ok: true,
      msg: usuario,
      token
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error inesperado ... revisar",
    });
  }
};
const editarUsuario = async (req, res = response) => {
  const uid = req.params.id;

  if (uid && uid.length !==24){
    return res.status(404).json({
      ok: false,
      msg: "El id no es valido",
    });
  }
  
  try {
    const usuariodb = await Usuario.findById(uid);
    if (!usuariodb) {
      return res.status(404).json({
        ok: false,
        msg: "No existe ese usuario",
      });
    }
    const { password, google, email, ...campos } = req.body;

    if (usuariodb.email !== email) {
      const existeEmail = await Usuario.findOne({ email: email });
      if (existeEmail) {
        return res.status(404).json({
          ok: false,
          msg: "El email existe",
        });
      }
    }
    campos.email = email;

    const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, {
      new: true,
    });

    res.status(200).json({
      ok: true,
      usuario: usuarioActualizado,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error inesperado ... revisar",
    });
  }
};
const borrarUsuario = async (req, res = response) => {
  const uid = req.params.id;

  if (uid && uid.length !==24){
    return res.status(404).json({
      ok: false,
      msg: "El id no es valido",
    });
  }
  try {
    const usuarioBorrar= await Usuario.findByIdAndDelete(uid);
    if (!usuarioBorrar){
      return res.status(400).json({
        ok: true,
        msg: "Usuario no encontrado",
      });  
    }
    res.status(200).json({
      ok: true,
      msg: "Usuario borrado correctamente",
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error inesperado ... revisar",
    });
  }
}



module.exports = { getUsuarios, crearUsuario, editarUsuario,borrarUsuario };
