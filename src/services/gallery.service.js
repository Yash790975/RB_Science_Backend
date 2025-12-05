const statusCode = require("../enums/statusCode");
const CustomError = require("../exceptions/CustomError");
const Gallery = require("../models/Gallery");
const mongoose = require("mongoose");
const fs = require("fs"); 
const path = require("path");
const { UPLOADS_ROOT } = require("../middlewares/upload");

// const galleryService = {
  const add = async (req, res) => {
    let uploadedFile;
    try {
      const data = req.body;
      const file = req.file;

      if (!file) {
        throw new CustomError("Gallery image is required", statusCode.BAD_REQUEST);
      }

      // Handle image upload
      const imageRelativePath = path.join("uploads", "gallery", file.filename);
      const imageFullPath = path.join(UPLOADS_ROOT, "gallery", file.filename);
      uploadedFile = imageFullPath;
      data.image_url = imageRelativePath;

      return await Gallery.create(data);
    } catch (error) {
      if (uploadedFile && fs.existsSync(uploadedFile)) fs.unlinkSync(uploadedFile);
      throw error;
    }
  };

  const update = async (req, res) => {
    const { body, file } = req;
    let uploadedFile;

    if (!mongoose.Types.ObjectId.isValid(body.id)) {
      throw new CustomError("Invalid gallery ID format", statusCode.BAD_REQUEST);
    }

    const gallery = await Gallery.findById(body.id);
    if (!gallery) {
      if (file) {
        const tempPath = path.join(UPLOADS_ROOT, "gallery", file.filename);
        if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
      }
      throw new CustomError("Gallery item not found", statusCode.NOT_FOUND);
    }

    try {
      // Update fields except id
      Object.keys(body).forEach((key) => {
        if (key !== "id") gallery[key] = body[key];
      });

      // Handle new image
      if (file) {
        const newImageRelPath = path.join("uploads", "gallery", file.filename);
        const newImageFullPath = path.join(UPLOADS_ROOT, "gallery", file.filename);
        uploadedFile = newImageFullPath;

        // Delete old image
        if (gallery.image_url) {
          const oldImageFullPath = path.join(UPLOADS_ROOT, gallery.image_url.replace(/^uploads[\\/]/, ""));
          if (fs.existsSync(oldImageFullPath)) fs.unlinkSync(oldImageFullPath);
        }

        gallery.image_url = newImageRelPath;
      }

      return await gallery.save();
    } catch (error) {
      if (uploadedFile && fs.existsSync(uploadedFile)) fs.unlinkSync(uploadedFile);
      throw error;
    }
  };

  const remove = async (id) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new CustomError("Invalid gallery ID format", statusCode.BAD_REQUEST);
    }

    const gallery = await Gallery.findById(id);
    if (!gallery) {
      throw new CustomError("Gallery item not found", statusCode.NOT_FOUND);
    }

    if (gallery.image_url) {
      const relativePath = gallery.image_url.replace(/^uploads[\\/]/, "");
      const imageFullPath = path.resolve(path.join(UPLOADS_ROOT, relativePath));

      try {
        if (fs.existsSync(imageFullPath)) {
          fs.unlinkSync(imageFullPath);
          console.log("Image deleted successfully");
        }
      } catch (err) {
        console.error("Failed to delete image:", imageFullPath, err);
      }
    }

    return await Gallery.findByIdAndDelete(id);
  };

  const getById = async (id) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new CustomError("Invalid gallery ID format", statusCode.BAD_REQUEST);
    }

    const gallery = await Gallery.findById(id);
    if (!gallery) {
      throw new CustomError("Gallery item not found", statusCode.NOT_FOUND);
    }
    return gallery;
  };

  const getAll = async () => {
    const gallery = await Gallery.find().sort({ createdAt: -1 });
    return gallery;
  };
// };

module.exports = {
  add,
  update,
  remove,
  getById,
  getAll
} 