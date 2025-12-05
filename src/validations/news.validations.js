// ============================================
// news.validations.js
// ============================================

const Joi = require("joi");

const idParam = Joi.string().hex().length(24).label("MongoId");

const contentItem = Joi.object({
  heading: Joi.string().required().trim().messages({
    "string.empty": "Content heading is required",
  }),
  para: Joi.string().required().trim().messages({
    "string.empty": "Content paragraph is required",
  }),
});

const addNews = Joi.object({
  name: Joi.string().min(2).max(200).required().trim().messages({
    "string.empty": "News name is required",
    "string.min": "News name must be at least 2 characters long",
    "string.max": "News name cannot exceed 200 characters",
    "any.required": "News name is required",
  }),
  slug: Joi.string().min(2).max(250).required().trim().messages({
    "string.empty": "News slug is required",
    "string.min": "News slug must be at least 2 characters long",
    "string.max": "News slug cannot exceed 250 characters",
    "any.required": "News slug is required",
  }),
  title: Joi.string().min(2).max(300).required().trim().messages({
    "string.empty": "News title is required",
    "string.min": "News title must be at least 2 characters long",
    "string.max": "News title cannot exceed 300 characters",
    "any.required": "News title is required",
  }),
  excerpt: Joi.string().min(10).max(500).required().trim().messages({
    "string.empty": "News excerpt is required",
    "string.min": "Excerpt must be at least 10 characters long",
    "string.max": "Excerpt cannot exceed 500 characters",
    "any.required": "News excerpt is required",
  }),
  content: Joi.alternatives().try(
    Joi.array().items(contentItem).min(1),
    Joi.string()
  ).required().messages({
    "any.required": "News content is required",
    "array.min": "At least one content item is required",
  }),
  date: Joi.date().required().messages({
    "any.required": "News date is required",
    "date.base": "Invalid date format",
  }),
  publishedAt: Joi.date().required().messages({
    "any.required": "Published date is required",
    "date.base": "Invalid date format",
  }),
  readTime: Joi.string().max(50).optional().allow(null, "").trim(),
  categoryId: idParam.required().messages({
    "any.required": "Category ID is required",
    "string.length": "Invalid Category ID length",
  }),
  image: Joi.any(),
  isActive: Joi.boolean().truthy('true').falsy('false').optional(),
});

const updateNews = Joi.object({
  id: idParam.required().messages({
    "any.required": "News ID is required",
    "string.length": "Invalid News ID length",
  }),
  name: Joi.string().min(2).max(200).optional().trim().messages({
    "string.min": "News name must be at least 2 characters long",
    "string.max": "News name cannot exceed 200 characters",
  }),
  slug: Joi.string().min(2).max(250).optional().trim().messages({
    "string.min": "News slug must be at least 2 characters long",
    "string.max": "News slug cannot exceed 250 characters",
  }),
  title: Joi.string().min(2).max(300).optional().trim().messages({
    "string.min": "News title must be at least 2 characters long",
    "string.max": "News title cannot exceed 300 characters",
  }),
  excerpt: Joi.string().min(10).max(500).optional().trim().messages({
    "string.min": "Excerpt must be at least 10 characters long",
    "string.max": "Excerpt cannot exceed 500 characters",
  }),
  content: Joi.alternatives().try(
    Joi.array().items(contentItem).min(1),
    Joi.string()
  ).optional(),
  date: Joi.date().optional().messages({
    "date.base": "Invalid date format",
  }),
  publishedAt: Joi.date().optional().messages({
    "date.base": "Invalid date format",
  }),
  readTime: Joi.string().max(50).optional().allow(null, "").trim(),
  categoryId: idParam.optional().messages({
    "string.length": "Invalid Category ID length",
  }),
  image: Joi.any(),
  isActive: Joi.boolean().truthy('true').falsy('false').optional(),
});

const getNewsById = Joi.object({
  params: Joi.object({
    id: idParam.required(),
  }),
});

const deleteNews = Joi.object({
  params: Joi.object({
    id: idParam.required(),
  }),
});

const getNewsByCategoryId = Joi.object({
  params: Joi.object({
    categoryId: idParam.required(),
  }),
});

module.exports = {
  addNews,
  updateNews,
  getNewsById,
  deleteNews,
  getNewsByCategoryId,
};