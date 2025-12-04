const statusCode = require("../enums/statusCode");
const CustomError = require("../exceptions/CustomError");
const TrainingPrograms = require("../models/TrainingPrograms");
const mongoose = require("mongoose");

const fs = require("fs");
const path = require("path");
const { UPLOADS_ROOT } = require("../middlewares/upload");

const add = async (req, res) => {
  let uploadedFile;
  try {
    const data = req.body;
    const file = req.file;

    // Parse features if it's a string
    if (typeof data.features === "string") {
      try {
        data.features = JSON.parse(data.features);
      } catch (err) {
        throw new CustomError("Invalid features format", statusCode.BAD_REQUEST);
      }
    }

    // Validate features array
    if (!Array.isArray(data.features) || data.features.length === 0) {
      throw new CustomError(
        "At least one feature is required",
        statusCode.BAD_REQUEST
      );
    }

    // Handle image upload if provided
    if (file) {
      const imageRelativePath = path.join(
        "uploads",
        "trainingPrograms",
        file.filename
      );
      const imageFullPath = path.join(
        UPLOADS_ROOT,
        "trainingPrograms",
        file.filename
      );
      uploadedFile = imageFullPath;
      data.image = imageRelativePath;
    }

    return await TrainingPrograms.create(data);
  } catch (error) {
    if (uploadedFile && fs.existsSync(uploadedFile))
      fs.unlinkSync(uploadedFile);
    console.error("Caught error:", error.message);
    throw error;
  }
};

const update = async (req, res) => {
  const { body, file } = req;
  let uploadedFile;

  if (!mongoose.Types.ObjectId.isValid(body.id)) {
    throw new CustomError(
      "Invalid training program ID format",
      statusCode.BAD_REQUEST
    );
  }

  const program = await TrainingPrograms.findById(body.id);
  if (!program) {
    if (file) {
      const tempPath = path.join(
        UPLOADS_ROOT,
        "trainingPrograms",
        file.filename
      );
      if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
    }
    throw new CustomError("Training program not found", statusCode.NOT_FOUND);
  }

  try {
    // Parse features if it's a string
    if (body.features && typeof body.features === "string") {
      try {
        body.features = JSON.parse(body.features);
      } catch (err) {
        if (file) {
          const tempPath = path.join(
            UPLOADS_ROOT,
            "trainingPrograms",
            file.filename
          );
          if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
        }
        throw new CustomError("Invalid features format", statusCode.BAD_REQUEST);
      }
    }

    // Validate features array if provided
    if (
      body.features &&
      (!Array.isArray(body.features) || body.features.length === 0)
    ) {
      if (file) {
        const tempPath = path.join(
          UPLOADS_ROOT,
          "trainingPrograms",
          file.filename
        );
        if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
      }
      throw new CustomError(
        "At least one feature is required",
        statusCode.BAD_REQUEST
      );
    }

    // Update fields except id
    Object.keys(body).forEach((key) => {
      if (key !== "id") program[key] = body[key];
    });

    // Handle new image
    if (file) {
      const newImageRelPath = path.join(
        "uploads",
        "trainingPrograms",
        file.filename
      );
      const newImageFullPath = path.join(
        UPLOADS_ROOT,
        "trainingPrograms",
        file.filename
      );
      uploadedFile = newImageFullPath;

      // Delete old image
      if (program.image) {
        const oldImageFullPath = path.join(
          UPLOADS_ROOT,
          program.image.replace(/^uploads[\\/]/, "")
        );
        if (fs.existsSync(oldImageFullPath)) fs.unlinkSync(oldImageFullPath);
      }

      program.image = newImageRelPath;
    }

    return await program.save();
  } catch (error) {
    if (uploadedFile && fs.existsSync(uploadedFile))
      fs.unlinkSync(uploadedFile);
    throw error;
  }
};

const remove = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new CustomError(
      "Invalid training program ID format",
      statusCode.BAD_REQUEST
    );
  }

  const program = await TrainingPrograms.findById(id);
  if (!program) {
    throw new CustomError("Training program not found", statusCode.NOT_FOUND);
  }

  if (program.image) {
    const relativePath = program.image.replace(/^uploads[\\/]/, "");
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

  return await TrainingPrograms.findByIdAndDelete(id);
};

const getById = async (id) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new CustomError(
        "Invalid training program ID format",
        statusCode.BAD_REQUEST
      );
    }

    const program = await TrainingPrograms.findById(id);
    if (!program) {
      throw new CustomError("Training program not found", statusCode.NOT_FOUND);
    }
    return program;
  } catch (error) {
    throw error;
  }
};

const getActive = async () => {
  try {
    const programs = await TrainingPrograms.find({ isActive: true }).sort({
      createdAt: -1,
    });
    return programs;
  } catch (error) {
    throw error;
  }
};

const getAll = async () => {
  try {
    const programs = await TrainingPrograms.find().sort({ createdAt: -1 });
    return programs;
  } catch (error) {
    throw error;
  }
};

const getByScreenName = async (screen_name) => {
  try {
    const programs = await TrainingPrograms.find({ screen_name }).sort({
      createdAt: -1,
    });
    return programs;
  } catch (error) {
    throw error;
  }
};

const getActiveByScreenName = async (screen_name) => {
  try {
    const programs = await TrainingPrograms.find({
      screen_name,
      isActive: true,
    }).sort({ createdAt: -1 });
    return programs;
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
  getByScreenName,
  getActiveByScreenName,
};