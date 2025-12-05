// ============================================
// gallery.controller.js
// ============================================

const  galleryService  = require("../services/gallery.service");
const apiResponse = require("../utils/apiResponse");
const statusCode = require("../enums/statusCode"); 

// const galleryController = {
  exports.add = async (req, res) => {
    try {
      const result = await galleryService.add(req, res);
      res.status(statusCode.CREATED).json(
        apiResponse({
          success: true,
          isException: false,
          statusCode: statusCode.CREATED,
          message: "Gallery item added successfully",
          result,
        })
      );
    } catch (err) {
      console.error("Add Gallery Error:", err);
      res.status(err.statusCode || statusCode.INTERNAL_SERVER_ERROR).json(
        apiResponse({
          success: false,
          isException: true,
          statusCode: err.statusCode || statusCode.INTERNAL_SERVER_ERROR,
          message: err.message || "Failed to add gallery item",
          result: null,
        })
      );
    }
  }, 

  exports.update = async (req, res) => {
    try {
      const result = await galleryService.update(req, res);
      res.status(statusCode.OK).json(
        apiResponse({
          success: true,
          isException: false,
          statusCode: statusCode.OK,
          message: "Gallery item updated successfully",
          result,
        })
      );
    } catch (err) {
      console.error("Update Gallery Error:", err);
      res.status(err.statusCode || statusCode.INTERNAL_SERVER_ERROR).json(
        apiResponse({
          success: false,
          isException: true,
          statusCode: err.statusCode || statusCode.INTERNAL_SERVER_ERROR,
          message: err.message || "Failed to update gallery item",
          result: null,
        })
      );
    }
  },

  exports.getById = async (req, res) => {
    try {
      const result = await galleryService.getById(req.params.id);
      res.status(statusCode.OK).json(
        apiResponse({
          success: true,
          isException: false,
          statusCode: statusCode.OK,
          message: "Gallery item retrieved successfully",
          result,
        })
      );
    } catch (err) {
      console.error("GetById Gallery Error:", err);
      res.status(err.statusCode || statusCode.INTERNAL_SERVER_ERROR).json(
        apiResponse({
          success: false,
          isException: true,
          statusCode: err.statusCode || statusCode.INTERNAL_SERVER_ERROR,
          message: err.message || "Failed to fetch gallery item",
          result: null,
        })
      );
    }
  },

  exports.getAll = async (req, res) => {
    try {
      const result = await galleryService.getAll();
      res.status(statusCode.OK).json(
        apiResponse({
          success: true,
          isException: false,
          statusCode: statusCode.OK,
          message: "Gallery items retrieved successfully",
          result,
        })
      );
    } catch (err) {
      console.error("GetAll Gallery Error:", err);
      res.status(err.statusCode || statusCode.INTERNAL_SERVER_ERROR).json(
        apiResponse({
          success: false,
          isException: true,
          statusCode: err.statusCode || statusCode.INTERNAL_SERVER_ERROR,
          message: err.message || "Failed to fetch gallery items",
          result: null,
        })
      );
    }
  },

  exports.remove = async (req, res) => {
    try {
      const result = await galleryService.remove(req.params.id);
      res.status(statusCode.OK).json(
        apiResponse({
          success: true,
          isException: false,
          statusCode: statusCode.OK,
          message: "Gallery item deleted successfully",
          result,
        })
      );
    } catch (err) {
      console.error("Remove Gallery Error:", err);
      res.status(err.statusCode || statusCode.INTERNAL_SERVER_ERROR).json(
        apiResponse({
          success: false,
          isException: true,
          statusCode: err.statusCode || statusCode.INTERNAL_SERVER_ERROR,
          message: err.message || "Failed to delete gallery item",
          result: null,
        })
      );
    }
  }

// module.exports = galleryController;