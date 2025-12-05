// ============================================
// facilities.service.js
// ============================================

const statusCode = require("../enums/statusCode");
const CustomError = require("../exceptions/CustomError");
const Facilities = require("../models/Facilities");
const mongoose = require("mongoose");

const add = async (req, res) => { 
  try {
    const data = req.body;

    const existing = await Facilities.findOne({ title: data.title });
    if (existing) {
      throw new CustomError(
        `Facility with title [${data.title}] already exists`,
        statusCode.BAD_REQUEST
      );
    }

    return await Facilities.create(data);
  } catch (error) {
    throw error;
  }
};

const update = async (req, res) => {
  const { body } = req;

  if (!mongoose.Types.ObjectId.isValid(body.id)) {
    throw new CustomError("Invalid facility ID format", statusCode.BAD_REQUEST);
  }

  const facility = await Facilities.findById(body.id);
  if (!facility) {
    throw new CustomError("Facility not found", statusCode.NOT_FOUND);
  }

  try {
    if (body.title && body.title !== facility.title) {
      const conflict = await Facilities.findOne({ title: body.title });
      if (conflict) {
        throw new CustomError(
          `Facility with title [${body.title}] already exists`,
          statusCode.BAD_REQUEST
        );
      }
    }

    Object.keys(body).forEach((key) => {
      if (key !== "id") facility[key] = body[key];
    });

    return await facility.save();
  } catch (error) {
    throw error;
  }
};

const remove = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new CustomError("Invalid facility ID format", statusCode.BAD_REQUEST);
  }

  const facility = await Facilities.findById(id);
  if (!facility) {
    throw new CustomError("Facility not found", statusCode.NOT_FOUND);
  }

  return await Facilities.findByIdAndDelete(id);
};

const getById = async (id) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new CustomError("Invalid facility ID format", statusCode.BAD_REQUEST);
    }

    const facility = await Facilities.findById(id);
    if (!facility) {
      throw new CustomError("Facility not found", statusCode.NOT_FOUND);
    }
    return facility;
  } catch (error) {
    throw error;
  }
};

const getActive = async () => {
  try {
    const facilities = await Facilities.find({ is_active: true }).sort({ createdAt: -1 });
    return facilities;
  } catch (error) {
    throw error;
  }
};

const getAll = async () => {
  try {
    const facilities = await Facilities.find().sort({ createdAt: -1 });
    return facilities;
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