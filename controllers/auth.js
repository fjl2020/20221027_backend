const Usuario = require("../models/usuario");
const { response } = require("express");
const bcrypt = require("bcryptjs");
const { generarJWT } = require("../helpers/jwt");
const {googleVerify} = require("../helpers/google-verify");
const { getMenuFrontEnd } = require("../helpers/menu-frontend");


const login = async (req, res = response) => {
  try {
    const { email, password } = req.body;

    const usuarioAuth = await Usuario.findOne({ email });
    const validPassword = await bcrypt.compareSync(
      password,
      usuarioAuth.password
    );
    if (!validPassword) {
     
        return res.status(400).json({
            ok: false,
            msg: "you can't access",
          });
        
    }
    const token=await generarJWT(usuarioAuth.id)
    return res.status(200).json({
        ok: true,
        token,
        usuario:usuarioAuth,
        id:usuarioAuth.id,
        menu:getMenuFrontEnd(usuarioAuth.role)
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "error on auth hable con el admin",
    });
  }
};


const googleAuth=async(req,res=response)=>{
  const tokenGoogle = req.body.token
  try {
    const {name, email, picture} = await googleVerify(tokenGoogle)

    const usuarioDB = await Usuario.findOne({email})
    let usuario;
    if (!usuarioDB)
    {
      // si no existe
      usuario =new Usuario({
        nombre: name,
        email: email,
        password:"@@@",
        img:picture,
        google:true

      })
    }else
    {
      //existe usuario
      usuario = usuarioDB;
      usuario.google=true;
      usuario.password = "@@@";

    }
    await usuario.save();
    const token=await generarJWT(usuario.id)




    res.status(200).json({
      ok:true,
      token,
      usuario,
      id:usuario.id,
      menu:getMenuFrontEnd(usuario.role)
    });
    
  } catch (error) {
    console.log(error);
    return  res.status(500).json({
      ok:false,
      msg:"Un error ocurrio"
    });
    
  }
  
}
const renewToken= async (req,res=response)=>{
  const uid = req.uid
  const token=await generarJWT(uid)
  const usuarioDb= await Usuario.findById(uid)
  res.json({
    ok:true,
    token,
    id:uid,
    usuario:usuarioDb,
    menu:getMenuFrontEnd(usuarioDb.role)
  })
}
module.exports = { login ,googleAuth,renewToken};
