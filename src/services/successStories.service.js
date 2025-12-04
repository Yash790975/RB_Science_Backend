const statusCode = require("../enums/statusCode");
const CustomError = require("../exceptions/CustomError");
const SuccessStories = require("../models/SuccessStories");
const mongoose = require("mongoose");

const fs = require("fs");
const path = require("path");
const { UPLOADS_ROOT } = require("../middlewares/upload");

const add = async (req, res) => {
  let uploadedFile;
  try {
    const data = req.body;
    const file = req.file;

    // Handle image upload if provided
    if (file) {
      const imageRelativePath = path.join(
        "uploads",
        "successStories",
        file.filename
      );
      const imageFullPath = path.join(
        UPLOADS_ROOT,
        "successStories",
        file.filename
      );
      uploadedFile = imageFullPath;
      data.image = imageRelativePath;
    }

    return await SuccessStories.create(data);
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
      "Invalid success story ID format",
      statusCode.BAD_REQUEST
    );
  }

  const story = await SuccessStories.findById(body.id);
  if (!story) {
    if (file) {
      const tempPath = path.join(
        UPLOADS_ROOT,
        "successStories",
        file.filename
      );
      if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
    }
    throw new CustomError("Success story not found", statusCode.NOT_FOUND);
  }

  try {
    // Update fields except id
    Object.keys(body).forEach((key) => {
      if (key !== "id") story[key] = body[key];
    });

    // Handle new image
    if (file) {
      const newImageRelPath = path.join(
        "uploads",
        "successStories",
        file.filename
      );
      const newImageFullPath = path.join(
        UPLOADS_ROOT,
        "successStories",
        file.filename
      );
      uploadedFile = newImageFullPath;

      // Delete old image
      if (story.image) {
        const oldImageFullPath = path.join(
          UPLOADS_ROOT,
          story.image.replace(/^uploads[\\/]/, "")
        );
        if (fs.existsSync(oldImageFullPath)) fs.unlinkSync(oldImageFullPath);
      }

      story.image = newImageRelPath;
    }

    return await story.save();
  } catch (error) {
    if (uploadedFile && fs.existsSync(uploadedFile))
      fs.unlinkSync(uploadedFile);
    throw error;
  }
};

const remove = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new CustomError(
      "Invalid success story ID format",
      statusCode.BAD_REQUEST
    );
  }

  const story = await SuccessStories.findById(id);
  if (!story) {
    throw new CustomError("Success story not found", statusCode.NOT_FOUND);
  }

  if (story.image) {
    const relativePath = story.image.replace(/^uploads[\\/]/, "");
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

  return await SuccessStories.findByIdAndDelete(id);
};

const getById = async (id) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new CustomError(
        "Invalid success story ID format",
        statusCode.BAD_REQUEST
      );
    }

    const story = await SuccessStories.findById(id);
    if (!story) {
      throw new CustomError("Success story not found", statusCode.NOT_FOUND);
    }
    return story;
  } catch (error) {
    throw error;
  }
};

const getActive = async () => {
  try {
    const stories = await SuccessStories.find({ isActive: true }).sort({
      createdAt: -1,
    });
    return stories;
  } catch (error) {
    throw error;
  }
};

const getAll = async () => {
  try {
    const stories = await SuccessStories.find().sort({ createdAt: -1 });
    return stories;
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
};