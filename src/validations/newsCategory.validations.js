// ============================================
// newsCategory.validations.js
// ============================================

const Joi = require("joi");

const idParam = Joi.string().hex().length(24).label("MongoId");

const addNewsCategory = Joi.object({
  name: Joi.string().min(2).max(100).required().trim().messages({
    "string.empty": "Category name is required",
    "string.min": "Category name must be at least 2 characters long",
    "string.max": "Category name cannot exceed 100 characters",
    "any.required": "Category name is required",
  }),
  category: Joi.string().min(2).max(100).required().trim().messages({
    "string.empty": "Category type is required",
    "string.min": "Category type must be at least 2 characters long",
    "string.max": "Category type cannot exceed 100 characters",
    "any.required": "Category type is required",
  }),
  isActive: Joi.boolean().truthy('true').falsy('false').optional(),
});

const updateNewsCategory = Joi.object({
  id: idParam.required().messages({
    "any.required": "Category ID is required",
    "string.length": "Invalid Category ID length",
  }),
  name: Joi.string().min(2).max(100).optional().trim().messages({
    "string.min": "Category name must be at least 2 characters long",
    "string.max": "Category name cannot exceed 100 characters",
  }),
  category: Joi.string().min(2).max(100).optional().trim().messages({
    "string.min": "Category type must be at least 2 characters long",
    "string.max": "Category type cannot exceed 100 characters",
  }),
  isActive: Joi.boolean().truthy('true').falsy('false').optional(),
});

const getNewsCategoryById = Joi.object({
  params: Joi.object({
    id: idParam.required(),
  }),
});

const deleteNewsCategory = Joi.object({
  params: Joi.object({
    id: idParam.required(),
  }),
});

module.exports = {
  addNewsCategory,
  updateNewsCategory,
  getNewsCategoryById,
  deleteNewsCategory,
};