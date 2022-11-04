const Usuario = require("../models/usuario");
const { response } = require("express");
const bcrypt = require("bcryptjs");
const { generarJWT } = require("../helpers/jwt");

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
        token
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "error on auth hable con el admin",
    });
  }
};

module.exports = { login };
