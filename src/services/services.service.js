// ============================================
// services.service.js
// ============================================

const statusCode = require("../enums/statusCode");
const CustomError = require("../exceptions/CustomError");
const Services = require("../models/Services");
const mongoose = require("mongoose");

const add = async (req, res) => {
  try {
    const data = req.body;

    const existing = await Services.findOne({ title: data.title });
    if (existing) {
      throw new CustomError(
        `Service with title [${data.title}] already exists`,
        statusCode.BAD_REQUEST
      );
    }

    return await Services.create(data);
  } catch (error) {
    throw error;
  }
};

const update = async (req, res) => {
  const { body } = req;

  if (!mongoose.Types.ObjectId.isValid(body.id)) {
    throw new CustomError("Invalid service ID format", statusCode.BAD_REQUEST);
  }

  const service = await Services.findById(body.id);
  if (!service) {
    throw new CustomError("Service not found", statusCode.NOT_FOUND);
  }

  try {
    if (body.title && body.title !== service.title) {
      const conflict = await Services.findOne({ title: body.title });
      if (conflict) {
        throw new CustomError(
          `Service with title [${body.title}] already exists`,
          statusCode.BAD_REQUEST
        );
      }
    }

    Object.keys(body).forEach((key) => {
      if (key !== "id") service[key] = body[key];
    });

    return await service.save();
  } catch (error) {
    throw error;
  }
};

const remove = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new CustomError("Invalid service ID format", statusCode.BAD_REQUEST);
  }

  const service = await Services.findById(id);
  if (!service) {
    throw new CustomError("Service not found", statusCode.NOT_FOUND);
  }

  return await Services.findByIdAndDelete(id);
};

const getById = async (id) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new CustomError("Invalid service ID format", statusCode.BAD_REQUEST);
    }

    const service = await Services.findById(id);
    if (!service) {
      throw new CustomError("Service not found", statusCode.NOT_FOUND);
    }
    return service;
  } catch (error) {
    throw error;
  }
};

const getActive = async () => {
  try {
    const services = await Services.find({ is_active: true }).sort({ createdAt: -1 });
    return services;
  } catch (error) {
    throw error;
  }
};

const getAll = async () => {
  try {
    const services = await Services.find().sort({ createdAt: -1 });
    return services;
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

