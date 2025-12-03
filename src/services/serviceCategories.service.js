
// ============================================
// serviceCategories.service.js
// ============================================

const statusCode = require("../enums/statusCode");
const CustomError = require("../exceptions/CustomError");
const ServiceCategories = require("../models/ServiceCategories");
const Services = require("../models/Services");
const mongoose = require("mongoose");

const add = async (req, res) => {
  try {
    const data = req.body;

    // Verify service exists
    const serviceExists = await Services.findById(data.service_id);
    if (!serviceExists) {
      throw new CustomError("Service not found", statusCode.NOT_FOUND);
    }

    // Check for duplicate title under same service
    const existing = await ServiceCategories.findOne({
      service_id: data.service_id,
      title: data.title,
    });
    if (existing) {
      throw new CustomError(
        `Category with title [${data.title}] already exists under this service`,
        statusCode.BAD_REQUEST
      );
    }

    return await ServiceCategories.create(data);
  } catch (error) {
    throw error;
  }
};

const update = async (req, res) => {
  const { body } = req;

  if (!mongoose.Types.ObjectId.isValid(body.id)) {
    throw new CustomError("Invalid category ID format", statusCode.BAD_REQUEST);
  }

  const category = await ServiceCategories.findById(body.id);
  if (!category) {
    throw new CustomError("Service category not found", statusCode.NOT_FOUND);
  }

  try {
    // If service_id is being changed, verify new service exists
    if (body.service_id && body.service_id !== category.service_id.toString()) {
      const serviceExists = await Services.findById(body.service_id);
      if (!serviceExists) {
        throw new CustomError("Service not found", statusCode.NOT_FOUND);
      }
    }

    // Check for duplicate title under the service
    const targetServiceId = body.service_id || category.service_id;
    const targetTitle = body.title || category.title;

    if (body.title || body.service_id) {
      const conflict = await ServiceCategories.findOne({
        _id: { $ne: body.id },
        service_id: targetServiceId,
        title: targetTitle,
      });
      if (conflict) {
        throw new CustomError(
          `Category with title [${targetTitle}] already exists under this service`,
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

  const category = await ServiceCategories.findById(id);
  if (!category) {
    throw new CustomError("Service category not found", statusCode.NOT_FOUND);
  }

  return await ServiceCategories.findByIdAndDelete(id);
};

const getById = async (id) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new CustomError("Invalid category ID format", statusCode.BAD_REQUEST);
    }

    const category = await ServiceCategories.findById(id).populate("service_id");
    if (!category) {
      throw new CustomError("Service category not found", statusCode.NOT_FOUND);
    }
    return category;
  } catch (error) {
    throw error;
  }
};

const getActive = async () => {
  try {
    const categories = await ServiceCategories.find({ is_active: true })
      .populate("service_id")
      .sort({ createdAt: -1 });
    return categories;
  } catch (error) {
    throw error;
  }
};

const getAll = async () => {
  try {
    const categories = await ServiceCategories.find()
      .populate("service_id")
      .sort({ createdAt: -1 });
    return categories;
  } catch (error) {
    throw error;
  }
};

const getCategoriesByServiceId = async (serviceId) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(serviceId)) {
      throw new CustomError("Invalid service ID format", statusCode.BAD_REQUEST);
    }

    const categories = await ServiceCategories.find({ service_id: serviceId })
      .populate("service_id")
      .sort({ createdAt: -1 });
    return categories;
  } catch (error) {
    throw error;
  }
};

const getActiveCategoriesByServiceId = async (serviceId) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(serviceId)) {
      throw new CustomError("Invalid service ID format", statusCode.BAD_REQUEST);
    }

    const categories = await ServiceCategories.find({
      service_id: serviceId,
      is_active: true,
    })
      .populate("service_id")
      .sort({ createdAt: -1 });
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
  getCategoriesByServiceId,
  getActiveCategoriesByServiceId,
};

