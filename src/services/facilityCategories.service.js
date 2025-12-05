// ============================================
// facilityCategories.service.js
// ============================================

const statusCode = require("../enums/statusCode");
const CustomError = require("../exceptions/CustomError");
const FacilityCategories = require("../models/FacilityCategories");
const Facilities = require("../models/Facilities");
const mongoose = require("mongoose");

const add = async (req, res) => {
  try {
    const data = req.body;

    // Verify facility exists
    const facilityExists = await Facilities.findById(data.facility_id);
    if (!facilityExists) {
      throw new CustomError("Facility not found", statusCode.NOT_FOUND);
    }

    // Check for duplicate title under same facility
    const existing = await FacilityCategories.findOne({
      facility_id: data.facility_id,
      title: data.title,
    });
    if (existing) {
      throw new CustomError(
        `Category with title [${data.title}] already exists under this facility`,
        statusCode.BAD_REQUEST
      );
    }

    return await FacilityCategories.create(data);
  } catch (error) {
    throw error;
  }
};

const update = async (req, res) => {
  const { body } = req;

  if (!mongoose.Types.ObjectId.isValid(body.id)) {
    throw new CustomError("Invalid category ID format", statusCode.BAD_REQUEST);
  }

  const category = await FacilityCategories.findById(body.id);
  if (!category) {
    throw new CustomError("Facility category not found", statusCode.NOT_FOUND);
  }

  try {
    // If facility_id is being changed, verify new facility exists
    if (body.facility_id && body.facility_id !== category.facility_id.toString()) {
      const facilityExists = await Facilities.findById(body.facility_id);
      if (!facilityExists) {
        throw new CustomError("Facility not found", statusCode.NOT_FOUND);
      }
    }

    // Check for duplicate title under the facility
    const targetFacilityId = body.facility_id || category.facility_id;
    const targetTitle = body.title || category.title;

    if (body.title || body.facility_id) {
      const conflict = await FacilityCategories.findOne({
        _id: { $ne: body.id },
        facility_id: targetFacilityId,
        title: targetTitle,
      });
      if (conflict) {
        throw new CustomError(
          `Category with title [${targetTitle}] already exists under this facility`,
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

  const category = await FacilityCategories.findById(id);
  if (!category) {
    throw new CustomError("Facility category not found", statusCode.NOT_FOUND);
  }

  return await FacilityCategories.findByIdAndDelete(id);
};

const getById = async (id) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new CustomError("Invalid category ID format", statusCode.BAD_REQUEST);
    }

    const category = await FacilityCategories.findById(id).populate("facility_id");
    if (!category) {
      throw new CustomError("Facility category not found", statusCode.NOT_FOUND);
    }
    return category;
  } catch (error) {
    throw error;
  }
};

const getActive = async () => {
  try {
    const categories = await FacilityCategories.find({ is_active: true })
      .populate("facility_id")
      .sort({ createdAt: -1 });
    return categories;
  } catch (error) {
    throw error;
  }
};

const getAll = async () => {
  try {
    const categories = await FacilityCategories.find()
      .populate("facility_id")
      .sort({ createdAt: -1 });
    return categories;
  } catch (error) {
    throw error;
  }
};

const getCategoriesByFacilityId = async (facilityId) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(facilityId)) {
      throw new CustomError("Invalid facility ID format", statusCode.BAD_REQUEST);
    }

    const categories = await FacilityCategories.find({ facility_id: facilityId })
      .populate("facility_id")
      .sort({ createdAt: -1 });
    return categories;
  } catch (error) {
    throw error;
  }
};

const getActiveCategoriesByFacilityId = async (facilityId) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(facilityId)) {
      throw new CustomError("Invalid facility ID format", statusCode.BAD_REQUEST);
    }

    const categories = await FacilityCategories.find({
      facility_id: facilityId,
      is_active: true,
    })
      .populate("facility_id")
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
  getCategoriesByFacilityId,
  getActiveCategoriesByFacilityId,
};