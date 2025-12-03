
// ============================================
// collaborativeProjects.validations.js
// ============================================
const Joi = require("joi");

const idParam = Joi.string().hex().length(24).label("MongoId");

const addCollaborativeProject = Joi.object({
  title: Joi.string().min(2).max(200).required().trim().messages({
    "string.empty": "Project title is required",
    "string.min": "Project title must be at least 2 characters long",
    "string.max": "Project title cannot exceed 200 characters",
    "any.required": "Project title is required",
  }),
  description: Joi.string().min(10).max(1000).required().trim().messages({
    "string.empty": "Project description is required",
    "string.min": "Project description must be at least 10 characters long",
    "string.max": "Project description cannot exceed 1000 characters",
    "any.required": "Project description is required",
  }),
  university: Joi.string().min(2).max(100).required().trim().messages({
    "string.empty": "University name is required",
    "string.min": "University name must be at least 2 characters long",
    "string.max": "University name cannot exceed 100 characters",
    "any.required": "University name is required",
  }),
  image: Joi.any(),
  isActive: Joi.boolean().truthy("true").falsy("false").optional(),
});

const updateCollaborativeProject = Joi.object({
  id: idParam.required().messages({
    "any.required": "Project ID is required",
    "string.length": "Invalid Project ID length",
  }),
  title: Joi.string().min(2).max(200).optional().trim().messages({
    "string.min": "Project title must be at least 2 characters long",
    "string.max": "Project title cannot exceed 200 characters",
  }),
  description: Joi.string().min(10).max(1000).optional().trim().messages({
    "string.min": "Project description must be at least 10 characters long",
    "string.max": "Project description cannot exceed 1000 characters",
  }),
  university: Joi.string().min(2).max(100).optional().trim().messages({
    "string.min": "University name must be at least 2 characters long",
    "string.max": "University name cannot exceed 100 characters",
  }),
  image: Joi.any(),
  isActive: Joi.boolean().truthy("true").falsy("false").optional(),
});

const getCollaborativeProjectById = Joi.object({
  params: Joi.object({
    id: idParam.required(),
  }),
});

const deleteCollaborativeProject = Joi.object({
  params: Joi.object({
    id: idParam.required(),
  }),
});

module.exports = {
  addCollaborativeProject,
  updateCollaborativeProject,
  getCollaborativeProjectById,
  deleteCollaborativeProject,
};
