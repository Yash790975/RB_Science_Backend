// ============================================
// certificates.service.js
// ============================================

const statusCode = require("../enums/statusCode");
const CustomError = require("../exceptions/CustomError");
const Certificates = require("../models/Certificates");
const mongoose = require("mongoose");

const fs = require("fs");
const path = require("path");
const { UPLOADS_ROOT } = require("../middlewares/upload");

const add = async (req, res) => {
  let uploadedFile;
  try {
    const data = req.body;
    const file = req.file;

    if (!file) {
      throw new CustomError("Certificate image is required", statusCode.BAD_REQUEST);
    }

    // Parse featured array if it's a string
    if (data.featured && typeof data.featured === "string") {
      try {
        data.featured = JSON.parse(data.featured);
      } catch (e) {
        data.featured = data.featured.split(",").map((item) => item.trim());
      }
    }

    // Parse long_description array if it's a string
    if (data.long_description && typeof data.long_description === "string") {
      try {
        data.long_description = JSON.parse(data.long_description);
      } catch (e) {
        if (file) {
          const tempPath = path.join(UPLOADS_ROOT, "certificates", file.filename);
          if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
        }
        throw new CustomError("Invalid long_description format", statusCode.BAD_REQUEST);
      }
    }

    // Handle image upload
    const imageRelativePath = path.join("uploads", "certificates", file.filename);
    const imageFullPath = path.join(UPLOADS_ROOT, "certificates", file.filename);
    uploadedFile = imageFullPath;
    data.image_url = imageRelativePath;

    return await Certificates.create(data);
  } catch (error) {
    if (uploadedFile && fs.existsSync(uploadedFile)) fs.unlinkSync(uploadedFile);
    throw error;
  }
};

const update = async (req, res) => {
  const { body, file } = req;
  let uploadedFile;

  if (!mongoose.Types.ObjectId.isValid(body.id)) {
    throw new CustomError("Invalid certificate ID format", statusCode.BAD_REQUEST);
  }

  const certificate = await Certificates.findById(body.id);
  if (!certificate) {
    if (file) {
      const tempPath = path.join(UPLOADS_ROOT, "certificates", file.filename);
      if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
    }
    throw new CustomError("Certificate not found", statusCode.NOT_FOUND);
  }

  try {
    // Parse featured array if it's a string
    if (body.featured && typeof body.featured === "string") {
      try {
        body.featured = JSON.parse(body.featured);
      } catch (e) {
        body.featured = body.featured.split(",").map((item) => item.trim());
      }
    }

    // Parse long_description array if it's a string
    if (body.long_description && typeof body.long_description === "string") {
      try {
        body.long_description = JSON.parse(body.long_description);
      } catch (e) {
        if (file) {
          const tempPath = path.join(UPLOADS_ROOT, "certificates", file.filename);
          if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
        }
        throw new CustomError("Invalid long_description format", statusCode.BAD_REQUEST);
      }
    }

    // Update fields except id
    Object.keys(body).forEach((key) => {
      if (key !== "id") certificate[key] = body[key];
    });

    // Handle new image
    if (file) {
      const newImageRelPath = path.join("uploads", "certificates", file.filename);
      const newImageFullPath = path.join(UPLOADS_ROOT, "certificates", file.filename);
      uploadedFile = newImageFullPath;

      // Delete old image
      if (certificate.image_url) {
        const oldImageFullPath = path.join(UPLOADS_ROOT, certificate.image_url.replace(/^uploads[\\/]/, ""));
        if (fs.existsSync(oldImageFullPath)) fs.unlinkSync(oldImageFullPath);
      }

      certificate.image_url = newImageRelPath;
    }

    return await certificate.save();
  } catch (error) {
    if (uploadedFile && fs.existsSync(uploadedFile)) fs.unlinkSync(uploadedFile);
    throw error;
  }
};

const remove = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new CustomError("Invalid certificate ID format", statusCode.BAD_REQUEST);
  }

  const certificate = await Certificates.findById(id);
  if (!certificate) {
    throw new CustomError("Certificate not found", statusCode.NOT_FOUND);
  }

  if (certificate.image_url) {
    const relativePath = certificate.image_url.replace(/^uploads[\\/]/, "");
    const imageFullPath = path.resolve(path.join(UPLOADS_ROOT, relativePath));

    try {
      if (fs.existsSync(imageFullPath)) {
        fs.unlinkSync(imageFullPath);
        console.log("Image deleted successfully");
      } else {
        console.warn("Image file does not exist:", imageFullPath);
      }
    } catch (err) {
      console.error("Failed to delete image:", imageFullPath, err);
    }
  }

  return await Certificates.findByIdAndDelete(id);
};

const getById = async (id) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new CustomError("Invalid certificate ID format", statusCode.BAD_REQUEST);
    }

    const certificate = await Certificates.findById(id);
    if (!certificate) {
      throw new CustomError("Certificate not found", statusCode.NOT_FOUND);
    }
    return certificate;
  } catch (error) {
    throw error;
  }
};

const getAll = async () => {
  try {
    const certificates = await Certificates.find().sort({ createdAt: -1 });
    return certificates;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  add,
  update,
  remove,
  getById,
  getAll,
};