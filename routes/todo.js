const { Router } = require("express");
const { getTodo,getTodoByCol } = require("../controllers/busqueda");
const { validarJwt } = require("../middlewares/validar-jwt");

const router = Router()

router.get('/:buscarArg',[validarJwt],getTodo);
router.get('/coleccion/:tabla/:buscarArg',[validarJwt],getTodoByCol);

module.exports = router