// ============================================
// facilities.validations.js
// ============================================

const Joi = require("joi");

const idParam = Joi.string().hex().length(24).label("MongoId");

const addFacility = Joi.object({
  title: Joi.string().min(2).max(100).required().trim().messages({
    "string.empty": "Facility title is required",
    "string.min": "Facility title must be at least 2 characters long",
    "string.max": "Facility title cannot exceed 100 characters",
    "any.required": "Facility title is required",
  }),
  is_active: Joi.boolean().truthy('true').falsy('false').optional(),
});

const updateFacility = Joi.object({
  id: idParam.required().messages({
    "any.required": "Facility ID is required",
    "string.length": "Invalid Facility ID length",
  }),
  title: Joi.string().min(2).max(100).optional().trim().messages({
    "string.min": "Facility title must be at least 2 characters long",
    "string.max": "Facility title cannot exceed 100 characters",
  }),
  is_active: Joi.boolean().truthy('true').falsy('false').optional(),
});

const getFacilityById = Joi.object({
  params: Joi.object({
    id: idParam.required(),
  }),
});

const deleteFacility = Joi.object({
  params: Joi.object({
    id: idParam.required(),
  }),
});

module.exports = {
  addFacility,
  updateFacility,
  getFacilityById,
  deleteFacility,
};