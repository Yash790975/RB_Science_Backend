// ============================================
// certificates.controller.js
// ============================================

const certificatesService = require("../services/certificates.service");
const apiResponse = require("../utils/apiResponse");
const statusCode = require("../enums/statusCode");

// const certificatesController = {
  exports.add = async (req, res) => {
    try {
      const result = await certificatesService.add(req, res);
      res.status(statusCode.CREATED).json(
        apiResponse({
          success: true,
          isException: false,
          statusCode: statusCode.CREATED,
          message: "Certificate added successfully",
          result,
        })
      );
    } catch (err) {
      console.error("Add Certificate Error:", err);
      res.status(err.statusCode || statusCode.INTERNAL_SERVER_ERROR).json(
        apiResponse({
          success: false,
          isException: true,
          statusCode: err.statusCode || statusCode.INTERNAL_SERVER_ERROR,
          message: err.message || "Failed to add certificate",
          result: null,
        })
      );
    }
  }, 
 
  exports.update = async (req, res) => {
    try {
      const result = await certificatesService.update(req, res);
      res.status(statusCode.OK).json(
        apiResponse({
          success: true,
          isException: false,
          statusCode: statusCode.OK,
          message: "Certificate updated successfully",
          result,
        })
      );
    } catch (err) {
      console.error("Update Certificate Error:", err);
      res.status(err.statusCode || statusCode.INTERNAL_SERVER_ERROR).json(
        apiResponse({
          success: false,
          isException: true,
          statusCode: err.statusCode || statusCode.INTERNAL_SERVER_ERROR,
          message: err.message || "Failed to update certificate",
          result: null,
        })
      );
    }
  },

  exports.getById = async (req, res) => {
    try {
      const result = await certificatesService.getById(req.params.id);
      res.status(statusCode.OK).json(
        apiResponse({
          success: true,
          isException: false,
          statusCode: statusCode.OK,
          message: "Certificate retrieved successfully",
          result,
        })
      );
    } catch (err) {
      console.error("GetById Certificate Error:", err);
      res.status(err.statusCode || statusCode.INTERNAL_SERVER_ERROR).json(
        apiResponse({
          success: false,
          isException: true,
          statusCode: err.statusCode || statusCode.INTERNAL_SERVER_ERROR,
          message: err.message || "Failed to fetch certificate",
          result: null,
        })
      );
    }
  },

  exports.getAll = async (req, res) => {
    try {
      const result = await certificatesService.getAll();
      res.status(statusCode.OK).json(
        apiResponse({
          success: true,
          isException: false,
          statusCode: statusCode.OK,
          message: "Certificates retrieved successfully",
          result,
        })
      );
    } catch (err) {
      console.error("GetAll Certificates Error:", err);
      res.status(err.statusCode || statusCode.INTERNAL_SERVER_ERROR).json(
        apiResponse({
          success: false,
          isException: true,
          statusCode: err.statusCode || statusCode.INTERNAL_SERVER_ERROR,
          message: err.message || "Failed to fetch certificates",
          result: null,
        })
      );
    }
  },

  exports.remove = async (req, res) => {
    try {
      const result = await certificatesService.remove(req.params.id);
      res.status(statusCode.OK).json(
        apiResponse({
          success: true,
          isException: false,
          statusCode: statusCode.OK,
          message: "Certificate deleted successfully",
          result,
        })
      );
    } catch (err) {
      console.error("Remove Certificate Error:", err);
      res.status(err.statusCode || statusCode.INTERNAL_SERVER_ERROR).json(
        apiResponse({
          success: false,
          isException: true,
          statusCode: err.statusCode || statusCode.INTERNAL_SERVER_ERROR,
          message: err.message || "Failed to delete certificate",
          result: null,
        })
      );
    }
  }
// };

// module.exports = certificatesController;
