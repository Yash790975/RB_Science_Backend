// ============================================
// newsCategory.controller.js
// ============================================

const newsCategoryService = require("../services/newsCategory.service");
const apiResponse = require("../utils/apiResponse");
const statusCode = require("../enums/statusCode");

// const newsCategoryController = {
  
exports.add = async (req, res) => {
    try {
      const result = await newsCategoryService.add(req, res);
      res.status(statusCode.CREATED).json(
        apiResponse({
          success: true,
          isException: false,
          statusCode: statusCode.CREATED,
          message: "News category added successfully",
          result,
        })
      );
    } catch (err) {
      console.error("Add NewsCategory Error:", err);
      res.status(err.statusCode || statusCode.INTERNAL_SERVER_ERROR).json(
        apiResponse({
          success: false,
          isException: true,
          statusCode: err.statusCode || statusCode.INTERNAL_SERVER_ERROR,
          message: err.message || "Failed to add news category",
          result: null,
        })
      );
    }
  },

  
  exports.update = async (req, res) => {
    try {
      const result = await newsCategoryService.update(req, res);
      res.status(statusCode.OK).json(
        apiResponse({
          success: true,
          isException: false,
          statusCode: statusCode.OK,
          message: "News category updated successfully",
          result,
        })
      );
    } catch (err) {
      console.error("Update NewsCategory Error:", err);
      res.status(err.statusCode || statusCode.INTERNAL_SERVER_ERROR).json(
        apiResponse({
          success: false,
          isException: true,
          statusCode: err.statusCode || statusCode.INTERNAL_SERVER_ERROR,
          message: err.message || "Failed to update news category",
          result: null,
        })
      );
    }
  },

  
  exports.getById = async (req, res) => {
    try {
      const result = await newsCategoryService.getById(req.params.id);
      res.status(statusCode.OK).json(
        apiResponse({
          success: true,
          isException: false,
          statusCode: statusCode.OK,
          message: "News category retrieved successfully",
          result,
        })
      );
    } catch (err) {
      console.error("GetById NewsCategory Error:", err);
      res.status(err.statusCode || statusCode.INTERNAL_SERVER_ERROR).json(
        apiResponse({
          success: false,
          isException: true,
          statusCode: err.statusCode || statusCode.INTERNAL_SERVER_ERROR,
          message: err.message || "Failed to fetch news category",
          result: null,
        })
      );
    }
  },

  
  exports.getAll = async (req, res) => {
    try {
      const result = await newsCategoryService.getAll();
      res.status(statusCode.OK).json(
        apiResponse({
          success: true,
          isException: false,
          statusCode: statusCode.OK,
          message: "News categories retrieved successfully",
          result,
        })
      );
    } catch (err) {
      console.error("GetAll NewsCategories Error:", err);
      res.status(err.statusCode || statusCode.INTERNAL_SERVER_ERROR).json(
        apiResponse({
          success: false,
          isException: true,
          statusCode: err.statusCode || statusCode.INTERNAL_SERVER_ERROR,
          message: err.message || "Failed to fetch news categories",
          result: null,
        })
      );
    }
  },

  
  exports.remove = async (req, res) => {
    try {
      const result = await newsCategoryService.remove(req.params.id);
      res.status(statusCode.OK).json(
        apiResponse({
          success: true,
          isException: false,
          statusCode: statusCode.OK,
          message: "News category deleted successfully",
          result,
        })
      );
    } catch (err) {
      console.error("Remove NewsCategory Error:", err);
      res.status(err.statusCode || statusCode.INTERNAL_SERVER_ERROR).json(
        apiResponse({
          success: false,
          isException: true,
          statusCode: err.statusCode || statusCode.INTERNAL_SERVER_ERROR,
          message: err.message || "Failed to delete news category",
          result: null,
        })
      );
    }
  },

  
  exports.getActive = async (req, res) => {
    try {
      const result = await newsCategoryService.getActive();
      res.status(statusCode.OK).json(
        apiResponse({
          success: true,
          isException: false,
          statusCode: statusCode.OK,
          message: "Active news categories retrieved successfully",
          result,
        })
      );
    } catch (err) {
      console.error("GetActive NewsCategory Error:", err);
      res.status(err.statusCode || statusCode.INTERNAL_SERVER_ERROR).json(
        apiResponse({
          success: false,
          isException: true,
          statusCode: err.statusCode || statusCode.INTERNAL_SERVER_ERROR,
          message: err.message || "Failed to fetch active news categories",
          result: null,
        })
      );
    }
  }
// };

// module.exports = newsCategoryController;
