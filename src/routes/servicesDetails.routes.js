
// ============================================
// servicesDetails.routes.js
// ============================================

const express = require("express");
const validate = require("../middlewares/validation.middleware");
const {
  addServiceDetail,
  updateServiceDetail,
  getServiceDetailById,
  deleteServiceDetail,
  getDetailsByCategoryId,
} = require("../validations/servicesDetails.validations");
const servicesDetailsController = require("../controllers/servicesDetails.controllers");
const { uploadServiceDetail } = require("../middlewares/upload");
const router = express.Router();

router.post("/add", uploadServiceDetail, validate(addServiceDetail), servicesDetailsController.add);
router.post("/update", uploadServiceDetail, validate(updateServiceDetail), servicesDetailsController.update);
router.get("/getById/:id", validate(getServiceDetailById), servicesDetailsController.getById);
router.get("/getAll", servicesDetailsController.getAll);
router.delete("/:id", validate(deleteServiceDetail), servicesDetailsController.remove);

// Get details by category
router.get("/category/:categoryId", validate(getDetailsByCategoryId), servicesDetailsController.getDetailsByCategoryId);

module.exports = router;
