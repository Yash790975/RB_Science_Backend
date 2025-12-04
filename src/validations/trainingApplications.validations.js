const Joi = require("joi");

const idParam = Joi.string().hex().length(24).label("MongoId");

const addTrainingApplication = Joi.object({
  fullname: Joi.string().min(2).max(100).required().trim().messages({
    "string.empty": "Full name is required",
    "string.min": "Full name must be at least 2 characters long",
    "string.max": "Full name cannot exceed 100 characters",
    "any.required": "Full name is required",
  }),
  email: Joi.string()
    .email()
    .required()
    .trim()
    .lowercase()
    .messages({
      "string.empty": "Email is required",
      "string.email": "Please provide a valid email address",
      "any.required": "Email is required",
    }),
  phoneNumber: Joi.string()
    .pattern(/^[0-9]{10,15}$/)
    .required()
    .trim()
    .messages({
      "string.empty": "Phone number is required",
      "string.pattern.base": "Phone number must be between 10 and 15 digits",
      "any.required": "Phone number is required",
    }),
  education_level: Joi.string().min(2).max(100).required().trim().messages({
    "string.empty": "Education level is required",
    "string.min": "Education level must be at least 2 characters long",
    "string.max": "Education level cannot exceed 100 characters",
    "any.required": "Education level is required",
  }),
  preferred_program_id: idParam.required().messages({
    "string.empty": "Preferred program is required",
    "string.length": "Invalid preferred program ID",
    "any.required": "Preferred program is required",
  }),
  reason: Joi.string().min(20).max(1000).required().trim().messages({
    "string.empty": "Reason for application is required",
    "string.min": "Reason must be at least 20 characters long",
    "string.max": "Reason cannot exceed 1000 characters",
    "any.required": "Reason is required",
  }),
  status: Joi.string()
    .valid("pending", "approved", "rejected")
    .optional()
    .messages({
      "any.only": "Status must be 'pending', 'approved', or 'rejected'",
    }),
});

const updateTrainingApplication = Joi.object({
  id: idParam.required().messages({
    "any.required": "Training application ID is required",
    "string.length": "Invalid training application ID length",
  }),
  fullname: Joi.string().min(2).max(100).optional().trim().messages({
    "string.min": "Full name must be at least 2 characters long",
    "string.max": "Full name cannot exceed 100 characters",
  }),
  email: Joi.string().email().optional().trim().lowercase().messages({
    "string.email": "Please provide a valid email address",
  }),
  phoneNumber: Joi.string()
    .pattern(/^[0-9]{10,15}$/)
    .optional()
    .trim()
    .messages({
      "string.pattern.base": "Phone number must be between 10 and 15 digits",
    }),
  education_level: Joi.string().min(2).max(100).optional().trim().messages({
    "string.min": "Education level must be at least 2 characters long",
    "string.max": "Education level cannot exceed 100 characters",
  }),
  preferred_program_id: idParam.optional().messages({
    "string.length": "Invalid preferred program ID",
  }),
  reason: Joi.string().min(20).max(1000).optional().trim().messages({
    "string.min": "Reason must be at least 20 characters long",
    "string.max": "Reason cannot exceed 1000 characters",
  }),
  status: Joi.string()
    .valid("pending", "approved", "rejected")
    .optional()
    .messages({
      "any.only": "Status must be 'pending', 'approved', or 'rejected'",
    }),
});

const getTrainingApplicationById = Joi.object({
  params: Joi.object({
    id: idParam.required(),
  }),
});

const deleteTrainingApplication = Joi.object({
  params: Joi.object({
    id: idParam.required(),
  }),
});

const getByProgramId = Joi.object({
  params: Joi.object({
    program_id: idParam.required(),
  }),
});

const getByStatus = Joi.object({
  params: Joi.object({
    status: Joi.string().valid("pending", "approved", "rejected").required(),
  }),
});

module.exports = {
  addTrainingApplication,
  updateTrainingApplication,
  getTrainingApplicationById,
  deleteTrainingApplication,
  getByProgramId,
  getByStatus,
};