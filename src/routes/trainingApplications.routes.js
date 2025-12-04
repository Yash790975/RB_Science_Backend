const express = require("express");
const validate = require("../middlewares/validation.middleware");
const {
  addTrainingApplication,
  updateTrainingApplication,
  getTrainingApplicationById,
  deleteTrainingApplication,
  getByProgramId,
  getByStatus,
} = require("../validations/trainingApplications.validations");
const trainingApplicationsController = require("../controllers/trainingApplications.controllers");
const router = express.Router();

// CRUD routes
router.post(
  "/add",
  validate(addTrainingApplication),
  trainingApplicationsController.add
);
router.post(
  "/update",
  validate(updateTrainingApplication),
  trainingApplicationsController.update
);
router.get(
  "/getById/:id",
  validate(getTrainingApplicationById),
  trainingApplicationsController.getById
);
router.get("/getAll", trainingApplicationsController.getAll);
router.delete(
  "/:id",
  validate(deleteTrainingApplication),
  trainingApplicationsController.remove
);

// Filter routes
router.get(
  "/program/:program_id",
  validate(getByProgramId),
  trainingApplicationsController.getByProgramId
);
router.get(
  "/status/:status",
  validate(getByStatus),
  trainingApplicationsController.getByStatus
);

// Update status route
router.post("/updateStatus", trainingApplicationsController.updateStatus);

module.exports = router;