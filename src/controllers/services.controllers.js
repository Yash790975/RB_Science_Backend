// ============================================
// services.controllers.js
// ============================================

const servicesService = require("../services/services.service");
const apiResponse = require("../utils/apiResponse");
const statusCode = require("../enums/statusCode");

exports.add = async (req, res) => {
  try {
    const result = await servicesService.add(req, res);
    res.status(statusCode.CREATED).json(
      apiResponse({
        success: true,
        isException: false,
        statusCode: statusCode.CREATED,
        message: "Service added successfully",
        result,
      })
    );
  } catch (err) {
    console.error("Add Service Error:", err);
    res.status(err.statusCode || statusCode.INTERNAL_SERVER_ERROR).json(
      apiResponse({
        success: false,
        isException: true,
        statusCode: err.statusCode || statusCode.INTERNAL_SERVER_ERROR,
        message: err.message || "Failed to add service",
        result: null,
      })
    );
  }
};

exports.update = async (req, res) => {
  try {
    const result = await servicesService.update(req, res);
    res.status(statusCode.OK).json(
      apiResponse({
        success: true,
        isException: false,
        statusCode: statusCode.OK,
        message: "Service updated successfully",
        result,
      })
    );
  } catch (err) {
    console.error("Update Service Error:", err);
    res.status(err.statusCode || statusCode.INTERNAL_SERVER_ERROR).json(
      apiResponse({
        success: false,
        isException: true,
        statusCode: err.statusCode || statusCode.INTERNAL_SERVER_ERROR,
        message: err.message || "Failed to update service",
        result: null,
      })
    );
  }
};

exports.getById = async (req, res) => {
  try {
    const result = await servicesService.getById(req.params.id);
    res.status(statusCode.OK).json(
      apiResponse({
        success: true,
        isException: false,
        statusCode: statusCode.OK,
        message: "Service retrieved successfully",
        result,
      })
    );
  } catch (err) {
    console.error("GetById Service Error:", err);
    res.status(err.statusCode || statusCode.INTERNAL_SERVER_ERROR).json(
      apiResponse({
        success: false,
        isException: true,
        statusCode: err.statusCode || statusCode.INTERNAL_SERVER_ERROR,
        message: err.message || "Failed to fetch service",
        result: null,
      })
    );
  }
};

exports.getAll = async (req, res) => {
  try {
    const result = await servicesService.getAll();
    res.status(statusCode.OK).json(
      apiResponse({
        success: true,
        isException: false,
        statusCode: statusCode.OK,
        message: "Services retrieved successfully",
        result,
      })
    );
  } catch (err) {
    console.error("GetAll Services Error:", err);
    res.status(err.statusCode || statusCode.INTERNAL_SERVER_ERROR).json(
      apiResponse({
        success: false,
        isException: true,
        statusCode: err.statusCode || statusCode.INTERNAL_SERVER_ERROR,
        message: err.message || "Failed to fetch services",
        result: null,
      })
    );
  }
};

exports.remove = async (req, res) => {
  try {
    const result = await servicesService.remove(req.params.id);
    res.status(statusCode.OK).json(
      apiResponse({
        success: true,
        isException: false,
        statusCode: statusCode.OK,
        message: "Service deleted successfully",
        result,
      })
    );
  } catch (err) {
    console.error("Remove Service Error:", err);
    res.status(err.statusCode || statusCode.INTERNAL_SERVER_ERROR).json(
      apiResponse({
        success: false,
        isException: true,
        statusCode: err.statusCode || statusCode.INTERNAL_SERVER_ERROR,
        message: err.message || "Failed to delete service",
        result: null,
      })
    );
  }
};

exports.getActive = async (req, res) => {
  try {
    const result = await servicesService.getActive();
    res.status(statusCode.OK).json(
      apiResponse({
        success: true,
        isException: false,
        statusCode: statusCode.OK,
        message: "Active services retrieved successfully",
        result,
      })
    );
  } catch (err) {
    console.error("GetActive Service Error:", err);
    res.status(err.statusCode || statusCode.INTERNAL_SERVER_ERROR).json(
      apiResponse({
        success: false,
        isException: true,
        statusCode: err.statusCode || statusCode.INTERNAL_SERVER_ERROR,
        message: err.message || "Failed to fetch active services",
        result: null,
      })
    );
  }
};

