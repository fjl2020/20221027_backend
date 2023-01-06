const { Router } = require("express");
const { check } = require("express-validator");
const {
  getUsuarios,
  crearUsuario,
  editarUsuario,
  borrarUsuario,
} = require("../controllers/usuarios");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJwt, validarAdminRole ,validarAdminRole_O_mismo_usuario} = require("../middlewares/validar-jwt");
const router = Router();

/* 
    Ruta: /api/usuarios
*/

router.get("/", [validarJwt], getUsuarios);
router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("password", "El password es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").isEmail(),
    validarCampos,
  ],
  crearUsuario
);
router.put(
  "/:id",
  [
    validarJwt,
    validarAdminRole_O_mismo_usuario,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").isEmail(),
    check("role", "El role es obligatorio").not().isEmpty(),
    validarCampos,

  ],
  editarUsuario
);
router.delete("/:id", [validarJwt,validarAdminRole],borrarUsuario);

module.exports = router;
