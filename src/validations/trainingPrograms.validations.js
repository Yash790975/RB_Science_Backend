const Joi = require("joi");

const idParam = Joi.string().hex().length(24).label("MongoId");

const addTrainingProgram = Joi.object({
  title: Joi.string().min(3).max(200).required().trim().messages({
    "string.empty": "Training program title is required",
    "string.min": "Title must be at least 3 characters long",
    "string.max": "Title cannot exceed 200 characters",
    "any.required": "Title is required",
  }),
  screen_name: Joi.string()
    .valid("internship", "full-time")
    .required()
    .trim()
    .messages({
      "string.empty": "Screen name is required",
      "any.only": "Screen name must be either 'internship' or 'full-time'",
      "any.required": "Screen name is required",
    }),
  description: Joi.string().min(10).max(1000).optional().trim().messages({
    "string.min": "Description must be at least 10 characters long",
    "string.max": "Description cannot exceed 1000 characters",
  }),
  image: Joi.any(),
  weeks: Joi.string().min(1).max(50).required().trim().messages({
    "string.empty": "Duration in weeks is required",
    "string.min": "Weeks must be at least 1 character long",
    "string.max": "Weeks cannot exceed 50 characters",
    "any.required": "Weeks is required",
  }),
  fees: Joi.string().min(1).max(50).required().trim().messages({
    "string.empty": "Fees is required",
    "string.min": "Fees must be at least 1 character long",
    "string.max": "Fees cannot exceed 50 characters",
    "any.required": "Fees is required",
  }),
  features: Joi.alternatives()
    .try(
      Joi.array().items(Joi.string().trim()).min(1).required(),
      Joi.string().custom((value, helpers) => {
        try {
          const parsed = JSON.parse(value);
          if (!Array.isArray(parsed) || parsed.length === 0) {
            return helpers.error("array.min");
          }
          return parsed;
        } catch (error) {
          return helpers.error("array.base");
        }
      })
    )
    .messages({
      "array.base": "Features must be an array",
      "array.min": "At least one feature is required",
      "any.required": "Features are required",
    }),
  isActive: Joi.boolean().truthy("true").falsy("false").optional(),
});

const updateTrainingProgram = Joi.object({
  id: idParam.required().messages({
    "any.required": "Training program ID is required",
    "string.length": "Invalid training program ID length",
  }),
  title: Joi.string().min(3).max(200).optional().trim().messages({
    "string.min": "Title must be at least 3 characters long",
    "string.max": "Title cannot exceed 200 characters",
  }),
  screen_name: Joi.string()
    .valid("internship", "full-time")
    .optional()
    .trim()
    .messages({
      "any.only": "Screen name must be either 'internship' or 'full-time'",
    }),
  description: Joi.string().min(10).max(1000).optional().trim().messages({
    "string.min": "Description must be at least 10 characters long",
    "string.max": "Description cannot exceed 1000 characters",
  }),
  image: Joi.any(),
  weeks: Joi.string().min(1).max(50).optional().trim().messages({
    "string.min": "Weeks must be at least 1 character long",
    "string.max": "Weeks cannot exceed 50 characters",
  }),
  fees: Joi.string().min(1).max(50).optional().trim().messages({
    "string.min": "Fees must be at least 1 character long",
    "string.max": "Fees cannot exceed 50 characters",
  }),
  features: Joi.alternatives()
    .try(
      Joi.array().items(Joi.string().trim()).min(1).optional(),
      Joi.string().custom((value, helpers) => {
        try {
          const parsed = JSON.parse(value);
          if (!Array.isArray(parsed) || parsed.length === 0) {
            return helpers.error("array.min");
          }
          return parsed;
        } catch (error) {
          return helpers.error("array.base");
        }
      })
    )
    .messages({
      "array.base": "Features must be an array",
      "array.min": "At least one feature is required",
    }),
  isActive: Joi.boolean().truthy("true").falsy("false").optional(),
});

const getTrainingProgramById = Joi.object({
  params: Joi.object({
    id: idParam.required(),
  }),
});

const deleteTrainingProgram = Joi.object({
  params: Joi.object({
    id: idParam.required(),
  }),
});

const getByScreenName = Joi.object({
  params: Joi.object({
    screen_name: Joi.string().valid("internship", "full-time").required(),
  }),
});

module.exports = {
  addTrainingProgram,
  updateTrainingProgram,
  getTrainingProgramById,
  deleteTrainingProgram,
  getByScreenName,
};