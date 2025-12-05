// ============================================
// facilityDetails.validations.js
// ============================================

const Joi = require("joi");

const idParam = Joi.string().hex().length(24).label("MongoId");

const longDescriptionItem = Joi.object({
  label: Joi.string().required().trim().messages({
    "string.empty": "Long description label is required",
  }),
  description: Joi.string().required().trim().messages({
    "string.empty": "Long description text is required",
  }),
});

const addFacilityDetail = Joi.object({
  title: Joi.string().min(2).max(150).required().trim().messages({
    "string.empty": "Facility detail title is required",
    "string.min": "Title must be at least 2 characters long",
    "string.max": "Title cannot exceed 150 characters",
    "any.required": "Facility detail title is required",
  }),
  description: Joi.string().min(10).max(2000).optional().trim().messages({
    "string.min": "Description must be at least 10 characters long",
    "string.max": "Description cannot exceed 2000 characters",
  }),
  facility_category_id: idParam.required().messages({
    "any.required": "Facility category ID is required",
    "string.length": "Invalid Facility category ID length",
  }),
  featured: Joi.alternatives().try(
    Joi.array().items(Joi.string().trim()),
    Joi.string()
  ).optional(),
  image_url: Joi.any(),
  long_description: Joi.alternatives().try(
    Joi.array().items(longDescriptionItem),
    Joi.string()
  ).optional(),
});

const updateFacilityDetail = Joi.object({
  id: idParam.required().messages({
    "any.required": "Facility detail ID is required",
    "string.length": "Invalid Facility detail ID length",
  }),
  title: Joi.string().min(2).max(150).optional().trim().messages({
    "string.min": "Title must be at least 2 characters long",
    "string.max": "Title cannot exceed 150 characters",
  }),
  description: Joi.string().min(10).max(2000).optional().trim().messages({
    "string.min": "Description must be at least 10 characters long",
    "string.max": "Description cannot exceed 2000 characters",
  }),
  facility_category_id: idParam.optional().messages({
    "string.length": "Invalid Facility category ID length",
  }),
  featured: Joi.alternatives().try(
    Joi.array().items(Joi.string().trim()),
    Joi.string()
  ).optional(),
  image_url: Joi.any(),
  long_description: Joi.alternatives().try(
    Joi.array().items(longDescriptionItem),
    Joi.string()
  ).optional(),
});

const getFacilityDetailById = Joi.object({
  params: Joi.object({
    id: idParam.required(),
  }),
});

const deleteFacilityDetail = Joi.object({
  params: Joi.object({
    id: idParam.required(),
  }),
});

const getDetailsByCategoryId = Joi.object({
  params: Joi.object({
    categoryId: idParam.required(),
  }),
});

module.exports = {
  addFacilityDetail,
  updateFacilityDetail,
  getFacilityDetailById,
  deleteFacilityDetail,
  getDetailsByCategoryId,
};