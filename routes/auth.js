const { Router } = require("express");
const { check } = require("express-validator");
const { login } = require("../controllers/auth");
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


module.exports = router;
