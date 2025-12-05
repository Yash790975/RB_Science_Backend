// ============================================
// certificates.validations.js
// ============================================

const Joi = require("joi");

const idParam = Joi.string().hex().length(24).label("MongoId");

const longDescriptionItem = Joi.object({
  label: Joi.string().required().trim().messages({
    "string.empty": "Long description label is required",
  }),
  description: Joi.string().required().trim().messages({
    "string.empty": "Long description text is required",
  }),
});

const addCertificate = Joi.object({
  title: Joi.string().min(2).max(150).required().trim().messages({
    "string.empty": "Certificate title is required",
    "string.min": "Title must be at least 2 characters long",
    "string.max": "Title cannot exceed 150 characters",
    "any.required": "Certificate title is required",
  }),
  description: Joi.string().min(10).max(2000).required().trim().messages({
    "string.empty": "Description is required",
    "string.min": "Description must be at least 10 characters long",
    "string.max": "Description cannot exceed 2000 characters",
    "any.required": "Description is required",
  }),
  featured: Joi.alternatives().try(
    Joi.array().items(Joi.string().trim()),
    Joi.string()
  ).optional(), 
  image_url: Joi.any(),
  // .required().messages({
  //   "any.required": "Certificate image is required",
  // }),
  long_description: Joi.alternatives().try(
    Joi.array().items(longDescriptionItem),
    Joi.string()
  ).optional(),
});

const updateCertificate = Joi.object({
  id: idParam.required().messages({
    "any.required": "Certificate ID is required",
    "string.length": "Invalid Certificate ID length",
  }),
  title: Joi.string().min(2).max(150).optional().trim().messages({
    "string.min": "Title must be at least 2 characters long",
    "string.max": "Title cannot exceed 150 characters",
  }),
  description: Joi.string().min(10).max(2000).optional().trim().messages({
    "string.min": "Description must be at least 10 characters long",
    "string.max": "Description cannot exceed 2000 characters",
  }),
  featured: Joi.alternatives().try(
    Joi.array().items(Joi.string().trim()),
    Joi.string()
  ).optional(),
  image_url: Joi.any(),
  long_description: Joi.alternatives().try(
    Joi.array().items(longDescriptionItem),
    Joi.string()
  ).optional(),
});

const getCertificateById = Joi.object({
  params: Joi.object({
    id: idParam.required(),
  }),
});

const deleteCertificate = Joi.object({
  params: Joi.object({
    id: idParam.required(),
  }),
});

module.exports = {
  addCertificate,
  updateCertificate,
  getCertificateById,
  deleteCertificate,
};