
// ============================================
// serviceCategories.routes.js
// ============================================

const express = require("express");
const validate = require("../middlewares/validation.middleware");
const {
  addServiceCategory,
  updateServiceCategory,
  getServiceCategoryById,
  deleteServiceCategory,
  getCategoriesByServiceId,
} = require("../validations/serviceCategories.validations");
const serviceCategoriesController = require("../controllers/serviceCategories.controllers");
const router = express.Router();

router.post("/add", validate(addServiceCategory), serviceCategoriesController.add);
router.post("/update", validate(updateServiceCategory), serviceCategoriesController.update);
router.get("/getById/:id", validate(getServiceCategoryById), serviceCategoriesController.getById);
router.get("/getAll", serviceCategoriesController.getAll);
router.get("/getActive", serviceCategoriesController.getActive);
router.delete("/:id", validate(deleteServiceCategory), serviceCategoriesController.remove);

// Get categories by service
router.get("/service/:serviceId", validate(getCategoriesByServiceId), serviceCategoriesController.getCategoriesByServiceId);
router.get("/service/:serviceId/active", validate(getCategoriesByServiceId), serviceCategoriesController.getActiveCategoriesByServiceId);

module.exports = router;

