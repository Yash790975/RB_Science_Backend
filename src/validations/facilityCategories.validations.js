// ============================================
// facilityCategories.validations.js
// ============================================

const Joi = require("joi");

const idParam = Joi.string().hex().length(24).label("MongoId");

const addFacilityCategory = Joi.object({
  title: Joi.string().min(2).max(100).required().trim().messages({
    "string.empty": "Category title is required",
    "string.min": "Category title must be at least 2 characters long",
    "string.max": "Category title cannot exceed 100 characters",
    "any.required": "Category title is required",
  }),
  description: Joi.string().min(10).max(1000).optional().trim().messages({
    "string.min": "Description must be at least 10 characters long",
    "string.max": "Description cannot exceed 1000 characters",
  }),
  facility_id: idParam.required().messages({
    "any.required": "Facility ID is required",
    "string.length": "Invalid Facility ID length",
  }),
  is_active: Joi.boolean().truthy('true').falsy('false').optional(),
});

const updateFacilityCategory = Joi.object({
  id: idParam.required().messages({
    "any.required": "Category ID is required",
    "string.length": "Invalid Category ID length",
  }),
  title: Joi.string().min(2).max(100).optional().trim().messages({
    "string.min": "Category title must be at least 2 characters long",
    "string.max": "Category title cannot exceed 100 characters",
  }),
  description: Joi.string().min(10).max(1000).optional().trim().messages({
    "string.min": "Description must be at least 10 characters long",
    "string.max": "Description cannot exceed 1000 characters",
  }),
  facility_id: idParam.optional().messages({
    "string.length": "Invalid Facility ID length",
  }),
  is_active: Joi.boolean().truthy('true').falsy('false').optional(),
});

const getFacilityCategoryById = Joi.object({
  params: Joi.object({
    id: idParam.required(),
  }),
});

const deleteFacilityCategory = Joi.object({
  params: Joi.object({
    id: idParam.required(),
  }),
});

const getCategoriesByFacilityId = Joi.object({
  params: Joi.object({
    facilityId: idParam.required(),
  }),
});

module.exports = {
  addFacilityCategory,
  updateFacilityCategory,
  getFacilityCategoryById,
  deleteFacilityCategory,
  getCategoriesByFacilityId,
};