const { Router } = require("express");
const { check } = require("express-validator");
const { login,googleAuth} = require("../controllers/auth");
const { validarCampos } = require("../middlewares/validar-campos");
const router = Router();

/* 
    Ruta: /api/usuarios
*/

router.post("/login", [
    check('email').isEmail(),
    check('password').not().isEmpty(),
    validarCampos

],
login
);
router.post("/google", [
    check("token","El token de google es necesario").not().isEmpty(),
    validarCampos

],
googleAuth
);


module.exports = router;
