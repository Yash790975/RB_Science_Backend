const express = require("express");
const validate = require("../middlewares/validation.middleware");
const {
  addTrainingProgram,
  updateTrainingProgram,
  getTrainingProgramById,
  deleteTrainingProgram,
  getByScreenName,
} = require("../validations/trainingPrograms.validations");
const trainingProgramsController = require("../controllers/trainingPrograms.controllers");
const { uploadTrainingProgram } = require("../middlewares/upload");
const router = express.Router();

// CRUD routes
router.post(
  "/add",
  uploadTrainingProgram,
  validate(addTrainingProgram),
  trainingProgramsController.add
);
router.post(
  "/update",
  uploadTrainingProgram,
  validate(updateTrainingProgram),
  trainingProgramsController.update
);
router.get(
  "/getById/:id",
  validate(getTrainingProgramById),
  trainingProgramsController.getById
);
router.get("/getAll", trainingProgramsController.getAll);
router.get("/getActive", trainingProgramsController.getActive);
router.delete(
  "/:id",
  validate(deleteTrainingProgram),
  trainingProgramsController.remove
);

// Screen name routes
router.get(
  "/screen/:screen_name",
  validate(getByScreenName),
  trainingProgramsController.getByScreenName
);
router.get(
  "/screen/:screen_name/active",
  validate(getByScreenName),
  trainingProgramsController.getActiveByScreenName
);

module.exports = router;