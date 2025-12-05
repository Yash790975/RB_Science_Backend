// ============================================
// facilities.controllers.js 
// ============================================

const facilitiesService = require("../services/facilities.service");
const apiResponse = require("../utils/apiResponse");
const statusCode = require("../enums/statusCode");
 
exports.add = async (req, res) => {
  try {
    const result = await facilitiesService.add(req, res);
    res.status(statusCode.CREATED).json(
      apiResponse({
        success: true,
        isException: false,
        statusCode: statusCode.CREATED,
        message: "Facility added successfully",
        result,
      })
    );
  } catch (err) {
    console.error("Add Facility Error:", err);
    res.status(err.statusCode || statusCode.INTERNAL_SERVER_ERROR).json(
      apiResponse({
        success: false,
        isException: true,
        statusCode: err.statusCode || statusCode.INTERNAL_SERVER_ERROR,
        message: err.message || "Failed to add facility",
        result: null,
      })
    );
  }
};

exports.update = async (req, res) => {
  try {
    const result = await facilitiesService.update(req, res);
    res.status(statusCode.OK).json(
      apiResponse({
        success: true,
        isException: false,
        statusCode: statusCode.OK,
        message: "Facility updated successfully",
        result,
      })
    );
  } catch (err) {
    console.error("Update Facility Error:", err);
    res.status(err.statusCode || statusCode.INTERNAL_SERVER_ERROR).json(
      apiResponse({
        success: false,
        isException: true,
        statusCode: err.statusCode || statusCode.INTERNAL_SERVER_ERROR,
        message: err.message || "Failed to update facility",
        result: null,
      })
    );
  }
};

exports.getById = async (req, res) => {
  try {
    const result = await facilitiesService.getById(req.params.id);
    res.status(statusCode.OK).json(
      apiResponse({
        success: true,
        isException: false,
        statusCode: statusCode.OK,
        message: "Facility retrieved successfully",
        result,
      })
    );
  } catch (err) {
    console.error("GetById Facility Error:", err);
    res.status(err.statusCode || statusCode.INTERNAL_SERVER_ERROR).json(
      apiResponse({
        success: false,
        isException: true,
        statusCode: err.statusCode || statusCode.INTERNAL_SERVER_ERROR,
        message: err.message || "Failed to fetch facility",
        result: null,
      })
    );
  }
};

exports.getAll = async (req, res) => {
  try {
    const result = await facilitiesService.getAll();
    res.status(statusCode.OK).json(
      apiResponse({
        success: true,
        isException: false,
        statusCode: statusCode.OK,
        message: "Facilities retrieved successfully",
        result,
      })
    );
  } catch (err) {
    console.error("GetAll Facilities Error:", err);
    res.status(err.statusCode || statusCode.INTERNAL_SERVER_ERROR).json(
      apiResponse({
        success: false,
        isException: true,
        statusCode: err.statusCode || statusCode.INTERNAL_SERVER_ERROR,
        message: err.message || "Failed to fetch facilities",
        result: null,
      })
    );
  }
};

exports.remove = async (req, res) => {
  try {
    const result = await facilitiesService.remove(req.params.id);
    res.status(statusCode.OK).json(
      apiResponse({
        success: true,
        isException: false,
        statusCode: statusCode.OK,
        message: "Facility deleted successfully",
        result,
      })
    );
  } catch (err) {
    console.error("Remove Facility Error:", err);
    res.status(err.statusCode || statusCode.INTERNAL_SERVER_ERROR).json(
      apiResponse({
        success: false,
        isException: true,
        statusCode: err.statusCode || statusCode.INTERNAL_SERVER_ERROR,
        message: err.message || "Failed to delete facility",
        result: null,
      })
    );
  }
};

exports.getActive = async (req, res) => {
  try {
    const result = await facilitiesService.getActive();
    res.status(statusCode.OK).json(
      apiResponse({
        success: true,
        isException: false,
        statusCode: statusCode.OK,
        message: "Active facilities retrieved successfully",
        result,
      })
    );
  } catch (err) {
    console.error("GetActive Facility Error:", err);
    res.status(err.statusCode || statusCode.INTERNAL_SERVER_ERROR).json(
      apiResponse({
        success: false,
        isException: true,
        statusCode: err.statusCode || statusCode.INTERNAL_SERVER_ERROR,
        message: err.message || "Failed to fetch active facilities",
        result: null,
      })
    );
  }
};