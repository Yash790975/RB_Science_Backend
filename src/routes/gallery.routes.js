
// ============================================
// gallery.routes.js
// ============================================

const express4 = require("express");
const validate4 = require("../middlewares/validation.middleware");
const {
  addGallery, 
  updateGallery,
  getGalleryById,
  deleteGallery,
} = require("../validations/gallery.validations");
const  galleryController  = require("../controllers/gallery.controllers");
const { uploadGallery } = require("../middlewares/upload");
const router4 = express4.Router();

router4.post("/add", uploadGallery, validate4(addGallery), galleryController.add);
router4.post("/update", uploadGallery, validate4(updateGallery), galleryController.update);
router4.get("/getById/:id", validate4(getGalleryById), galleryController.getById);
router4.get("/getAll", galleryController.getAll);
router4.delete("/:id", validate4(deleteGallery), galleryController.remove);

module.exports = router4;