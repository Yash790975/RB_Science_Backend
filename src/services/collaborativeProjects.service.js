
// ============================================
//  collaborativeProjects.service.js
// ============================================
const statusCode = require("../enums/statusCode");
const CustomError = require("../exceptions/CustomError");
const CollaborativeProjects = require("../models/CollabrativeProjects");
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
      throw new CustomError("Project image is required", statusCode.BAD_REQUEST);
    }

    // Check if title already exists
    const existing = await CollaborativeProjects.findOne({ title: data.title });
    if (existing) {
      throw new CustomError(
        `Project with title "${data.title}" already exists`,
        statusCode.BAD_REQUEST
      );
    }

    const imageRelativePath = path.join("uploads", "collaborativeProjects", file.filename);
    const imageFullPath = path.join(UPLOADS_ROOT, "collaborativeProjects", file.filename);
    uploadedFile = imageFullPath;

    data.image = imageRelativePath;

    return await CollaborativeProjects.create(data);
  } catch (error) {
    if (uploadedFile && fs.existsSync(uploadedFile)) fs.unlinkSync(uploadedFile);
    console.error("Caught error:", error.message);
    throw error;
  }
};

const update = async (req, res) => {
  const { body, file } = req;
  let uploadedFile;

  if (!mongoose.Types.ObjectId.isValid(body.id)) {
    throw new CustomError("Invalid project ID format", statusCode.BAD_REQUEST);
  }

  const project = await CollaborativeProjects.findById(body.id);
  if (!project) {
    if (file) {
      const tempPath = path.join(UPLOADS_ROOT, "collaborativeProjects", file.filename);
      if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
    }
    throw new CustomError("Project not found", statusCode.NOT_FOUND);
  }

  try {
    // Check if new title conflicts with existing projects
    if (body.title && body.title !== project.title) {
      const conflict = await CollaborativeProjects.findOne({ title: body.title });
      if (conflict) {
        if (file) {
          const tempPath = path.join(UPLOADS_ROOT, "collaborativeProjects", file.filename);
          if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
        }
        throw new CustomError(
          `Project with title "${body.title}" already exists`,
          statusCode.BAD_REQUEST
        );
      }
    }

    // Update fields except id
    Object.keys(body).forEach((key) => {
      if (key !== "id") project[key] = body[key];
    });

    // Handle new image
    if (file) {
      const newImageRelPath = path.join("uploads", "collaborativeProjects", file.filename);
      const newImageFullPath = path.join(UPLOADS_ROOT, "collaborativeProjects", file.filename);
      uploadedFile = newImageFullPath;

      // Delete old image
      if (project.image) {
        const oldImageFullPath = path.join(UPLOADS_ROOT, project.image.replace(/^uploads[\\/]/, ""));
        if (fs.existsSync(oldImageFullPath)) fs.unlinkSync(oldImageFullPath);
      }

      project.image = newImageRelPath;
    }

    return await project.save();
  } catch (error) {
    if (uploadedFile && fs.existsSync(uploadedFile)) fs.unlinkSync(uploadedFile);
    throw error;
  }
};

const remove = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new CustomError("Invalid project ID format", statusCode.BAD_REQUEST);
  }

  const project = await CollaborativeProjects.findById(id);
  if (!project) {
    throw new CustomError("Project not found", statusCode.NOT_FOUND);
  }

  if (project.image) {
    const relativePath = project.image.replace(/^uploads[\\/]/, "");
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

  return await CollaborativeProjects.findByIdAndDelete(id);
};

const getById = async (id) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new CustomError("Invalid project ID format", statusCode.BAD_REQUEST);
    }

    const project = await CollaborativeProjects.findById(id);
    if (!project) {
      throw new CustomError("Project not found", statusCode.NOT_FOUND);
    }
    return project;
  } catch (error) {
    throw error;
  }
};

const getActive = async () => {
  try {
    const projects = await CollaborativeProjects.find({ isActive: true }).sort({ createdAt: -1 });
    return projects;
  } catch (error) {
    throw error;
  }
};

const getAll = async () => {
  try {
    const projects = await CollaborativeProjects.find().sort({ createdAt: -1 });
    return projects;
  } catch (error) {
    throw error;
  }
};

const getByUniversity = async (university) => {
  try {
    const projects = await CollaborativeProjects.find({ 
      university: university,
      isActive: true 
    }).sort({ createdAt: -1 });
    return projects;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  add,
  update,
  remove,
  getById,
  getActive,
  getAll,
  getByUniversity,
};
