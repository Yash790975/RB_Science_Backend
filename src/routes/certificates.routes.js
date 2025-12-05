// ============================================
// certificates.routes.js
// ============================================

const express = require("express");
const validate = require("../middlewares/validation.middleware");
const {
  addCertificate,
  updateCertificate, 
  getCertificateById,
  deleteCertificate,
} = require("../validations/certificates.validations");
const  certificatesController  = require("../controllers/certificates.controllers");
const { uploadCertificate } = require("../middlewares/upload");
const router = express.Router();

router.post("/add", uploadCertificate, validate(addCertificate), certificatesController.add);
router.post("/update", uploadCertificate, validate(updateCertificate), certificatesController.update);
router.get("/getById/:id", validate(getCertificateById), certificatesController.getById);
router.get("/getAll", certificatesController.getAll);
router.delete("/:id", validate(deleteCertificate), certificatesController.remove);

module.exports = router;
