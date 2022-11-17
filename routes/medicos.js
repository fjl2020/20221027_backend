const { Router } = require("express");
const { check } = require("express-validator");
const {
  getMedicos,
  crearMedico,
  actualizarMedico,
  borrarMedico,
} = require("../controllers/medicos");
const { validarJwt } = require("../middlewares/validar-jwt");
const { validarCampos } = require("../middlewares/validar-campos");

const router = Router();

router.get("/", [validarJwt], getMedicos);
router.post(
  "/",
  [
    validarJwt,
    check("nombre", "El nombre del medico es necesario").not().isEmpty(),
    check("hospital", "El id hospital debe ser válido ").isMongoId(),
    validarCampos,
  ],
  crearMedico
);
router.put(
  "/:id",
  [
    validarJwt,
    check("nombre", "El nombre del medico es necesario").not().isEmpty(),
    check("hospital", "El id hospital debe ser válido ").isMongoId(),
    validarCampos,
  ],
  actualizarMedico
);
router.delete("/:id", [validarJwt], borrarMedico);

module.exports = router;
