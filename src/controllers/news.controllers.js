// ============================================
// news.controller.js 
// ============================================  

const newsService  = require("../services/news.service");
const apiResponse = require("../utils/apiResponse");
const statusCode = require("../enums/statusCode");

// const newsController = {
  exports.add = async (req, res) => {
    try {
      const result = await newsService.add(req, res);
      res.status(statusCode.CREATED).json(
        apiResponse({
          success: true,
          isException: false,
          statusCode: statusCode.CREATED,
          message: "News added successfully",
          result,
        })
      );
    } catch (err) {
      console.error("Add News Error:", err);
      res.status(err.statusCode || statusCode.INTERNAL_SERVER_ERROR).json(
        apiResponse({
          success: false,
          isException: true,
          statusCode: err.statusCode || statusCode.INTERNAL_SERVER_ERROR,
          message: err.message || "Failed to add news",
          result: null,
        })
      );
    }
  },

  exports.update = async (req, res) => {
    try {
      const result = await newsService.update(req, res);
      res.status(statusCode.OK).json(
        apiResponse({
          success: true,
          isException: false,
          statusCode: statusCode.OK,
          message: "News updated successfully",
          result,
        })
      );
    } catch (err) {
      console.error("Update News Error:", err);
      res.status(err.statusCode || statusCode.INTERNAL_SERVER_ERROR).json(
        apiResponse({
          success: false,
          isException: true,
          statusCode: err.statusCode || statusCode.INTERNAL_SERVER_ERROR,
          message: err.message || "Failed to update news",
          result: null,
        })
      );
    }
  },

  exports.getById = async (req, res) => {
    try {
      const result = await newsService.getById(req.params.id);
      res.status(statusCode.OK).json(
        apiResponse({
          success: true,
          isException: false,
          statusCode: statusCode.OK,
          message: "News retrieved successfully",
          result,
        })
      );
    } catch (err) {
      console.error("GetById News Error:", err);
      res.status(err.statusCode || statusCode.INTERNAL_SERVER_ERROR).json(
        apiResponse({
          success: false,
          isException: true,
          statusCode: err.statusCode || statusCode.INTERNAL_SERVER_ERROR,
          message: err.message || "Failed to fetch news",
          result: null,
        })
      );
    }
  },

  exports.getAll = async (req, res) => {
    try {
      const result = await newsService.getAll();
      res.status(statusCode.OK).json(
        apiResponse({
          success: true,
          isException: false,
          statusCode: statusCode.OK,
          message: "News retrieved successfully",
          result,
        })
      );
    } catch (err) {
      console.error("GetAll News Error:", err);
      res.status(err.statusCode || statusCode.INTERNAL_SERVER_ERROR).json(
        apiResponse({
          success: false,
          isException: true,
          statusCode: err.statusCode || statusCode.INTERNAL_SERVER_ERROR,
          message: err.message || "Failed to fetch news",
          result: null,
        })
      );
    }
  },

  exports.remove = async (req, res) => {
    try {
      const result = await newsService.remove(req.params.id);
      res.status(statusCode.OK).json(
        apiResponse({
          success: true,
          isException: false,
          statusCode: statusCode.OK,
          message: "News deleted successfully",
          result,
        })
      );
    } catch (err) {
      console.error("Remove News Error:", err);
      res.status(err.statusCode || statusCode.INTERNAL_SERVER_ERROR).json(
        apiResponse({
          success: false,
          isException: true,
          statusCode: err.statusCode || statusCode.INTERNAL_SERVER_ERROR,
          message: err.message || "Failed to delete news",
          result: null,
        })
      );
    }
  },

  exports.getActive = async (req, res) => {
    try {
      const result = await newsService.getActive();
      res.status(statusCode.OK).json(
        apiResponse({
          success: true,
          isException: false,
          statusCode: statusCode.OK,
          message: "Active news retrieved successfully",
          result,
        })
      );
    } catch (err) {
      console.error("GetActive News Error:", err);
      res.status(err.statusCode || statusCode.INTERNAL_SERVER_ERROR).json(
        apiResponse({
          success: false,
          isException: true,
          statusCode: err.statusCode || statusCode.INTERNAL_SERVER_ERROR,
          message: err.message || "Failed to fetch active news",
          result: null,
        })
      );
    }
  },

  exports.getNewsByCategoryId = async (req, res) => {
    try {
      const result = await newsService.getNewsByCategoryId(req.params.categoryId);
      res.status(statusCode.OK).json(
        apiResponse({
          success: true,
          isException: false,
          statusCode: statusCode.OK,
          message: "News by category retrieved successfully",
          result,
        })
      );
    } catch (err) {
      console.error("GetNewsByCategoryId Error:", err);
      res.status(err.statusCode || statusCode.INTERNAL_SERVER_ERROR).json(
        apiResponse({
          success: false,
          isException: true,
          statusCode: err.statusCode || statusCode.INTERNAL_SERVER_ERROR,
          message: err.message || "Failed to fetch news by category",
          result: null,
        })
      );
    }
  },

  exports.getActiveNewsByCategoryId = async (req, res) => {
    try {
      const result = await newsService.getActiveNewsByCategoryId(req.params.categoryId);
      res.status(statusCode.OK).json(
        apiResponse({
          success: true,
          isException: false,
          statusCode: statusCode.OK,
          message: "Active news by category retrieved successfully",
          result,
        })
      );
    } catch (err) {
      console.error("GetActiveNewsByCategoryId Error:", err);
      res.status(err.statusCode || statusCode.INTERNAL_SERVER_ERROR).json(
        apiResponse({
          success: false,
          isException: true,
          statusCode: err.statusCode || statusCode.INTERNAL_SERVER_ERROR,
          message: err.message || "Failed to fetch active news by category",
          result: null,
        })
      );
    }
  }
// };

// module.exports = newsController;
