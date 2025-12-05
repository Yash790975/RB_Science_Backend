// ============================================
// facilityCategories.routes.js
// ============================================

const express = require("express");
const validate = require("../middlewares/validation.middleware");
const {
  addFacilityCategory,
  updateFacilityCategory,
  getFacilityCategoryById,
  deleteFacilityCategory,
  getCategoriesByFacilityId,
} = require("../validations/facilityCategories.validations");
const facilityCategoriesController = require("../controllers/facilityCategories.controllers");
const router = express.Router();

router.post("/add", validate(addFacilityCategory), facilityCategoriesController.add);
router.post("/update", validate(updateFacilityCategory), facilityCategoriesController.update);
router.get("/getById/:id", validate(getFacilityCategoryById), facilityCategoriesController.getById);
router.get("/getAll", facilityCategoriesController.getAll);
router.get("/getActive", facilityCategoriesController.getActive);
router.delete("/:id", validate(deleteFacilityCategory), facilityCategoriesController.remove);

// Get categories by facility
router.get("/facility/:facilityId", validate(getCategoriesByFacilityId), facilityCategoriesController.getCategoriesByFacilityId);
router.get("/facility/:facilityId/active", validate(getCategoriesByFacilityId), facilityCategoriesController.getActiveCategoriesByFacilityId);

module.exports = router;