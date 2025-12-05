// ============================================
// gallery.validations.js
// ============================================

const Joi = require("joi");

const idParam = Joi.string().hex().length(24).label("MongoId");

const addGallery = Joi.object({
  title: Joi.string().min(2).max(150).required().trim().messages({
    "string.empty": "Gallery title is required",
    "string.min": "Title must be at least 2 characters long",
    "string.max": "Title cannot exceed 150 characters",
    "any.required": "Gallery title is required",
  }),
  description: Joi.string().min(10).max(1000).required().trim().messages({
    "string.empty": "Description is required",
    "string.min": "Description must be at least 10 characters long",
    "string.max": "Description cannot exceed 1000 characters",
    "any.required": "Description is required",
  }),
  image_url: Joi.any()
  // .required().messages({
  //   "any.required": "Gallery image is required",  
  // }),
});

const updateGallery = Joi.object({
  id: idParam.required().messages({
    "any.required": "Gallery ID is required",
    "string.length": "Invalid Gallery ID length",
  }),
  title: Joi.string().min(2).max(150).optional().trim().messages({
    "string.min": "Title must be at least 2 characters long",
    "string.max": "Title cannot exceed 150 characters",
  }),
  description: Joi.string().min(10).max(1000).optional().trim().messages({
    "string.min": "Description must be at least 10 characters long",
    "string.max": "Description cannot exceed 1000 characters",
  }),
  image_url: Joi.any(),
});

const getGalleryById = Joi.object({
  params: Joi.object({
    id: idParam.required(),
  }),
});

const deleteGallery = Joi.object({
  params: Joi.object({
    id: idParam.required(),
  }),
});

module.exports = {
  addGallery,
  updateGallery,
  getGalleryById,
  deleteGallery,
};