// ============================================
// services.routes.js
// ============================================

const express = require("express");
const validate = require("../middlewares/validation.middleware");
const {
  addService,
  updateService,
  getServiceById,
  deleteService,
} = require("../validations/services.validations");
const servicesController = require("../controllers/services.controllers");
const router = express.Router();

router.post("/add", validate(addService), servicesController.add);
router.post("/update", validate(updateService), servicesController.update);
router.get("/getById/:id", validate(getServiceById), servicesController.getById);
router.get("/getAll", servicesController.getAll);
router.get("/getActive", servicesController.getActive);
router.delete("/:id", validate(deleteService), servicesController.remove);

module.exports = router;

