const express = require("express");
const validate = require("../middlewares/validation.middleware");
const {
  addSuccessStory,
  updateSuccessStory,
  getSuccessStoryById,
  deleteSuccessStory,
} = require("../validations/successStories.validations");
const successStoriesController = require("../controllers/successStories.controllers");
const { uploadSuccessStory } = require("../middlewares/upload");
const router = express.Router();

// CRUD routes
router.post(
  "/add",
  uploadSuccessStory,
  validate(addSuccessStory),
  successStoriesController.add
);
router.post(
  "/update",
  uploadSuccessStory,
  validate(updateSuccessStory),
  successStoriesController.update
);
router.get(
  "/getById/:id",
  validate(getSuccessStoryById),
  successStoriesController.getById
);
router.get("/getAll", successStoriesController.getAll);
router.get("/getActive", successStoriesController.getActive);
router.delete(
  "/:id",
  validate(deleteSuccessStory),
  successStoriesController.remove
);

module.exports = router;