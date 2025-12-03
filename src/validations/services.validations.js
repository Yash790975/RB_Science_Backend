// ============================================
// services.validations.js
// ============================================

const Joi = require("joi");

const idParam = Joi.string().hex().length(24).label("MongoId");

const addService = Joi.object({
  title: Joi.string().min(2).max(100).required().trim().messages({
    "string.empty": "Service title is required",
    "string.min": "Service title must be at least 2 characters long",
    "string.max": "Service title cannot exceed 100 characters",
    "any.required": "Service title is required",
  }),
  is_active: Joi.boolean().truthy('true').falsy('false').optional(),
});

const updateService = Joi.object({
  id: idParam.required().messages({
    "any.required": "Service ID is required",
    "string.length": "Invalid Service ID length",
  }),
  title: Joi.string().min(2).max(100).optional().trim().messages({
    "string.min": "Service title must be at least 2 characters long",
    "string.max": "Service title cannot exceed 100 characters",
  }),
  is_active: Joi.boolean().truthy('true').falsy('false').optional(),
});

const getServiceById = Joi.object({
  params: Joi.object({
    id: idParam.required(),
  }),
});

const deleteService = Joi.object({
  params: Joi.object({
    id: idParam.required(),
  }),
});

module.exports = {
  addService,
  updateService,
  getServiceById,
  deleteService,
};

