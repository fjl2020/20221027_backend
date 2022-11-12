const { Router } = require("express");
const { fileUpload,retornaImagen } = require("../controllers/uploads");
const { validarJwt } = require("../middlewares/validar-jwt");

const expressFileUpload = require('express-fileupload');


const router = Router()

router.use(expressFileUpload())
router.put('/:tipo/:id',[validarJwt],fileUpload); 
router.get('/:tipo/:foto',[],retornaImagen); 
module.exports = router