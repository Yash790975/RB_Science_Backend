// ============================================
// facilities.routes.js
// ============================================

const express = require("express");
const validate = require("../middlewares/validation.middleware");
const { 
  addFacility,
  updateFacility, 
  getFacilityById,
  deleteFacility,
} = require("../validations/facilities.validations");
const facilitiesController = require("../controllers/facilities.controllers"); 
const router = express.Router();

router.post("/add", validate(addFacility), facilitiesController.add);
router.post("/update", validate(updateFacility), facilitiesController.update);
router.get("/getById/:id", validate(getFacilityById), facilitiesController.getById);
router.get("/getAll", facilitiesController.getAll);
router.get("/getActive", facilitiesController.getActive);
router.delete("/:id", validate(deleteFacility), facilitiesController.remove);

module.exports = router;