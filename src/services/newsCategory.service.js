// ============================================
// newsCategory.service.js
// ============================================

const statusCode = require("../enums/statusCode");
const CustomError = require("../exceptions/CustomError");
const NewsCategory = require("../models/NewsCategory");
const mongoose = require("mongoose");

const add = async (req, res) => {
  try {
    const data = req.body;

    const existing = await NewsCategory.findOne({ name: data.name });
    if (existing) {
      throw new CustomError(
        `News category with name [${data.name}] already exists`,
        statusCode.BAD_REQUEST
      );
    }

    return await NewsCategory.create(data);
  } catch (error) {
    throw error;
  }
};

const update = async (req, res) => {
  const { body } = req;

  if (!mongoose.Types.ObjectId.isValid(body.id)) {
    throw new CustomError("Invalid category ID format", statusCode.BAD_REQUEST);
  }

  const category = await NewsCategory.findById(body.id);
  if (!category) {
    throw new CustomError("News category not found", statusCode.NOT_FOUND);
  }

  try {
    if (body.name && body.name !== category.name) {
      const conflict = await NewsCategory.findOne({ name: body.name });
      if (conflict) {
        throw new CustomError(
          `News category with name [${body.name}] already exists`,
          statusCode.BAD_REQUEST
        );
      }
    }

    Object.keys(body).forEach((key) => {
      if (key !== "id") category[key] = body[key];
    });

    return await category.save();
  } catch (error) {
    throw error;
  }
};

const remove = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new CustomError("Invalid category ID format", statusCode.BAD_REQUEST);
  }

  const category = await NewsCategory.findById(id);
  if (!category) {
    throw new CustomError("News category not found", statusCode.NOT_FOUND);
  }

  return await NewsCategory.findByIdAndDelete(id);
};

const getById = async (id) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new CustomError("Invalid category ID format", statusCode.BAD_REQUEST);
    }

    const category = await NewsCategory.findById(id);
    if (!category) {
      throw new CustomError("News category not found", statusCode.NOT_FOUND);
    }
    return category;
  } catch (error) {
    throw error;
  }
};

const getActive = async () => {
  try {
    const categories = await NewsCategory.find({ isActive: true }).sort({ createdAt: -1 });
    return categories;
  } catch (error) {
    throw error;
  }
};

const getAll = async () => {
  try {
    const categories = await NewsCategory.find().sort({ createdAt: -1 });
    return categories;
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