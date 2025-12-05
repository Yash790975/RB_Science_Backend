// ============================================
// facilityDetails.routes.js
// ============================================

const express = require("express");
const validate = require("../middlewares/validation.middleware");
const {
  addFacilityDetail,
  updateFacilityDetail,
  getFacilityDetailById,
  deleteFacilityDetail,
  getDetailsByCategoryId,
} = require("../validations/facilityDetails.validations");
const facilityDetailsController = require("../controllers/facilityDetails.controllers");
const { uploadFacilityDetail } = require("../middlewares/upload");
const router = express.Router();

router.post("/add", uploadFacilityDetail, validate(addFacilityDetail), facilityDetailsController.add);
router.post("/update", uploadFacilityDetail, validate(updateFacilityDetail), facilityDetailsController.update);
router.get("/getById/:id", validate(getFacilityDetailById), facilityDetailsController.getById);
router.get("/getAll", facilityDetailsController.getAll);
router.delete("/:id", validate(deleteFacilityDetail), facilityDetailsController.remove);

// Get details by category
router.get("/category/:categoryId", validate(getDetailsByCategoryId), facilityDetailsController.getDetailsByCategoryId);

module.exports = router;