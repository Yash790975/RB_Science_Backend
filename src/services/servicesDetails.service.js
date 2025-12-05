
  // ============================================
  // servicesDetails.service.js
  // ============================================

  const statusCode = require("../enums/statusCode");
  const CustomError = require("../exceptions/CustomError");
  const ServicesDetails = require("../models/ServicesDetails");
  const ServiceCategories = require("../models/ServiceCategories");
  const mongoose = require("mongoose");

  const fs = require("fs");
  const path = require("path");
  const { UPLOADS_ROOT } = require("../middlewares/upload");

  const add = async (req, res) => {
    let uploadedFile;
    try {
      const data = req.body;
      const file = req.file;

      // Verify category exists
      const categoryExists = await ServiceCategories.findById(data.service_category_id);
      if (!categoryExists) {
        if (file) {
          const tempPath = path.join(UPLOADS_ROOT, "servicesDetails", file.filename);
          if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
        }
        throw new CustomError("Service category not found", statusCode.NOT_FOUND);
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
          throw new CustomError("Invalid long_description format", statusCode.BAD_REQUEST);
        }
      }

      // Handle image upload
      if (file) {
        const imageRelativePath = path.join("uploads", "servicesDetails", file.filename);
        const imageFullPath = path.join(UPLOADS_ROOT, "servicesDetails", file.filename);
        uploadedFile = imageFullPath;
        data.image_url = imageRelativePath;
      }

      return await ServicesDetails.create(data);
    } catch (error) {
      if (uploadedFile && fs.existsSync(uploadedFile)) fs.unlinkSync(uploadedFile);
      throw error;
    }
  };

  const update = async (req, res) => {
    const { body, file } = req;
    let uploadedFile;

    if (!mongoose.Types.ObjectId.isValid(body.id)) {
      throw new CustomError("Invalid service detail ID format", statusCode.BAD_REQUEST);
    }

    const detail = await ServicesDetails.findById(body.id);
    if (!detail) {
      if (file) {
        const tempPath = path.join(UPLOADS_ROOT, "servicesDetails", file.filename);
        if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
      }
      throw new CustomError("Service detail not found", statusCode.NOT_FOUND);
    }

    try {
      // If category is being changed, verify new category exists
      if (body.service_category_id && body.service_category_id !== detail.service_category_id.toString()) {
        const categoryExists = await ServiceCategories.findById(body.service_category_id);
        if (!categoryExists) {
          if (file) {
            const tempPath = path.join(UPLOADS_ROOT, "servicesDetails", file.filename);
            if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
          }
          throw new CustomError("Service category not found", statusCode.NOT_FOUND);
        }
      }

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
            const tempPath = path.join(UPLOADS_ROOT, "servicesDetails", file.filename);
            if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
          }
          throw new CustomError("Invalid long_description format", statusCode.BAD_REQUEST);
        }
      }

      // Update fields except id
      Object.keys(body).forEach((key) => {
        if (key !== "id") detail[key] = body[key];
      });

      // Handle new image
      if (file) {
        const newImageRelPath = path.join("uploads", "servicesDetails", file.filename);
        const newImageFullPath = path.join(UPLOADS_ROOT, "servicesDetails", file.filename);
        uploadedFile = newImageFullPath;

        // Delete old image
        if (detail.image_url) {
          const oldImageFullPath = path.join(UPLOADS_ROOT, detail.image_url.replace(/^uploads[\\/]/, ""));
          if (fs.existsSync(oldImageFullPath)) fs.unlinkSync(oldImageFullPath);
        }

        detail.image_url = newImageRelPath;
      }

      return await detail.save();
    } catch (error) {
      if (uploadedFile && fs.existsSync(uploadedFile)) fs.unlinkSync(uploadedFile);
      throw error;
    }
  };

  const remove = async (id) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new CustomError("Invalid service detail ID format", statusCode.BAD_REQUEST);
    }

    const detail = await ServicesDetails.findById(id);
    if (!detail) {
      throw new CustomError("Service detail not found", statusCode.NOT_FOUND);
    }

    if (detail.image_url) {
      const relativePath = detail.image_url.replace(/^uploads[\\/]/, "");
      const imageFullPath = path.resolve(path.join(UPLOADS_ROOT, relativePath));
      console.log("ImageFullPath:", imageFullPath);

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

    return await ServicesDetails.findByIdAndDelete(id);
  };

  const getById = async (id) => {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new CustomError("Invalid service detail ID format", statusCode.BAD_REQUEST);
      }

      const detail = await ServicesDetails.findById(id).populate({
        path: "service_category_id",
        populate: { path: "service_id" },
      });
      if (!detail) {
        throw new CustomError("Service detail not found", statusCode.NOT_FOUND);
      }
      return detail;
    } catch (error) {
      throw error;
    }
  };

  const getAll = async () => {
    try {
      const details = await ServicesDetails.find()
        .populate({
          path: "service_category_id",
          populate: { path: "service_id" },
        })
        .sort({ createdAt: -1 });
      return details;
    } catch (error) {
      throw error;
    }
  };

  const getDetailsByCategoryId = async (categoryId) => {
    try {
      if (!mongoose.Types.ObjectId.isValid(categoryId)) {
        throw new CustomError("Invalid category ID format", statusCode.BAD_REQUEST);
      }

      const details = await ServicesDetails.find({ service_category_id: categoryId })
        .populate({
          path: "service_category_id",
          populate: { path: "service_id" },
        })
        .sort({ createdAt: -1 });
      return details;
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
    getDetailsByCategoryId,
  };