const Joi = require("joi");

const idParam = Joi.string().hex().length(24).label("MongoId");

const addSuccessStory = Joi.object({
  name: Joi.string().min(2).max(100).required().trim().messages({
    "string.empty": "Name is required",
    "string.min": "Name must be at least 2 characters long",
    "string.max": "Name cannot exceed 100 characters",
    "any.required": "Name is required",
  }),
  position: Joi.string().min(2).max(100).required().trim().messages({
    "string.empty": "Position is required",
    "string.min": "Position must be at least 2 characters long",
    "string.max": "Position cannot exceed 100 characters",
    "any.required": "Position is required",
  }),
  description: Joi.string().min(10).max(1000).optional().trim().messages({
    "string.min": "Description must be at least 10 characters long",
    "string.max": "Description cannot exceed 1000 characters",
  }),
  image: Joi.any(),
  isActive: Joi.boolean().truthy("true").falsy("false").optional(),
});

const updateSuccessStory = Joi.object({
  id: idParam.required().messages({
    "any.required": "Success story ID is required",
    "string.length": "Invalid success story ID length",
  }),
  name: Joi.string().min(2).max(100).optional().trim().messages({
    "string.min": "Name must be at least 2 characters long",
    "string.max": "Name cannot exceed 100 characters",
  }),
  position: Joi.string().min(2).max(100).optional().trim().messages({
    "string.min": "Position must be at least 2 characters long",
    "string.max": "Position cannot exceed 100 characters",
  }),
  description: Joi.string().min(10).max(1000).optional().trim().messages({
    "string.min": "Description must be at least 10 characters long",
    "string.max": "Description cannot exceed 1000 characters",
  }),
  image: Joi.any(),
  isActive: Joi.boolean().truthy("true").falsy("false").optional(),
});

const getSuccessStoryById = Joi.object({
  params: Joi.object({
    id: idParam.required(),
  }),
});

const deleteSuccessStory = Joi.object({
  params: Joi.object({
    id: idParam.required(),
  }),
});

module.exports = {
  addSuccessStory,
  updateSuccessStory,
  getSuccessStoryById,
  deleteSuccessStory,
};