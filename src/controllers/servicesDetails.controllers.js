
// ============================================
// servicesDetails.controllers.js
// ============================================

const servicesDetailsService = require("../services/servicesDetails.service");
const apiResponse = require("../utils/apiResponse");
const statusCode = require("../enums/statusCode");

exports.add = async (req, res) => {
  try {
    const result = await servicesDetailsService.add(req, res);
    res.status(statusCode.CREATED).json(
      apiResponse({
        success: true,
        isException: false,
        statusCode: statusCode.CREATED,
        message: "Service detail added successfully",
        result,
      })
    );
  } catch (err) {
    console.error("Add ServiceDetail Error:", err);
    res.status(err.statusCode || statusCode.INTERNAL_SERVER_ERROR).json(
      apiResponse({
        success: false,
        isException: true,
        statusCode: err.statusCode || statusCode.INTERNAL_SERVER_ERROR,
        message: err.message || "Failed to add service detail",
        result: null,
      })
    );
  }
};

exports.update = async (req, res) => {
  try {
    const result = await servicesDetailsService.update(req, res);
    res.status(statusCode.OK).json(
      apiResponse({
        success: true,
        isException: false,
        statusCode: statusCode.OK,
        message: "Service detail updated successfully",
        result,
      })
    );
  } catch (err) {
    console.error("Update ServiceDetail Error:", err);
    res.status(err.statusCode || statusCode.INTERNAL_SERVER_ERROR).json(
      apiResponse({
        success: false,
        isException: true,
        statusCode: err.statusCode || statusCode.INTERNAL_SERVER_ERROR,
        message: err.message || "Failed to update service detail",
        result: null,
      })
    );
  }
};

exports.getById = async (req, res) => {
  try {
    const result = await servicesDetailsService.getById(req.params.id);
    res.status(statusCode.OK).json(
      apiResponse({
        success: true,
        isException: false,
        statusCode: statusCode.OK,
        message: "Service detail retrieved successfully",
        result,
      })
    );
  } catch (err) {
    console.error("GetById ServiceDetail Error:", err);
    res.status(err.statusCode || statusCode.INTERNAL_SERVER_ERROR).json(
      apiResponse({
        success: false,
        isException: true,
        statusCode: err.statusCode || statusCode.INTERNAL_SERVER_ERROR,
        message: err.message || "Failed to fetch service detail",
        result: null,
      })
    );
  }
};

exports.getAll = async (req, res) => {
  try {
    const result = await servicesDetailsService.getAll();
    res.status(statusCode.OK).json(
      apiResponse({
        success: true,
        isException: false,
        statusCode: statusCode.OK,
        message: "Service details retrieved successfully",
        result,
      })
    );
  } catch (err) {
    console.error("GetAll ServiceDetails Error:", err);
    res.status(err.statusCode || statusCode.INTERNAL_SERVER_ERROR).json(
      apiResponse({
        success: false,
        isException: true,
        statusCode: err.statusCode || statusCode.INTERNAL_SERVER_ERROR,
        message: err.message || "Failed to fetch service details",
        result: null,
      })
    );
  }
};

exports.remove = async (req, res) => {
  try {
    const result = await servicesDetailsService.remove(req.params.id);
    res.status(statusCode.OK).json(
      apiResponse({
        success: true,
        isException: false,
        statusCode: statusCode.OK,
        message: "Service detail deleted successfully",
        result,
      })
    );
  } catch (err) {
    console.error("Remove ServiceDetail Error:", err);
    res.status(err.statusCode || statusCode.INTERNAL_SERVER_ERROR).json(
      apiResponse({
        success: false,
        isException: true,
        statusCode: err.statusCode || statusCode.INTERNAL_SERVER_ERROR,
        message: err.message || "Failed to delete service detail",
        result: null,
      })
    );
  }
};

exports.getDetailsByCategoryId = async (req, res) => {
  try {
    const result = await servicesDetailsService.getDetailsByCategoryId(req.params.categoryId);
    res.status(statusCode.OK).json(
      apiResponse({
        success: true,
        isException: false,
        statusCode: statusCode.OK,
        message: "Service details by category retrieved successfully",
        result,
      })
    );
  } catch (err) {
    console.error("GetDetailsByCategoryId Error:", err);
    res.status(err.statusCode || statusCode.INTERNAL_SERVER_ERROR).json(
      apiResponse({
        success: false,
        isException: true,
        statusCode: err.statusCode || statusCode.INTERNAL_SERVER_ERROR,
        message: err.message || "Failed to fetch service details by category",
        result: null,
      })
    );
  }
};