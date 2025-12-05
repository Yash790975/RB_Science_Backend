// ============================================
// facilityDetails.controllers.js
// ============================================

const facilityDetailsService = require("../services/facilityDetails.service");
const apiResponse = require("../utils/apiResponse");
const statusCode = require("../enums/statusCode");

exports.add = async (req, res) => {
  try {
    const result = await facilityDetailsService.add(req, res);
    res.status(statusCode.CREATED).json(
      apiResponse({
        success: true,
        isException: false,
        statusCode: statusCode.CREATED,
        message: "Facility detail added successfully",
        result,
      })
    );
  } catch (err) {
    console.error("Add FacilityDetail Error:", err);
    res.status(err.statusCode || statusCode.INTERNAL_SERVER_ERROR).json(
      apiResponse({
        success: false,
        isException: true,
        statusCode: err.statusCode || statusCode.INTERNAL_SERVER_ERROR,
        message: err.message || "Failed to add facility detail",
        result: null,
      })
    );
  }
};

exports.update = async (req, res) => {
  try {
    const result = await facilityDetailsService.update(req, res);
    res.status(statusCode.OK).json(
      apiResponse({
        success: true,
        isException: false,
        statusCode: statusCode.OK,
        message: "Facility detail updated successfully",
        result,
      })
    );
  } catch (err) {
    console.error("Update FacilityDetail Error:", err);
    res.status(err.statusCode || statusCode.INTERNAL_SERVER_ERROR).json(
      apiResponse({
        success: false,
        isException: true,
        statusCode: err.statusCode || statusCode.INTERNAL_SERVER_ERROR,
        message: err.message || "Failed to update facility detail",
        result: null,
      })
    );
  }
};

exports.getById = async (req, res) => {
  try {
    const result = await facilityDetailsService.getById(req.params.id);
    res.status(statusCode.OK).json(
      apiResponse({
        success: true,
        isException: false,
        statusCode: statusCode.OK,
        message: "Facility detail retrieved successfully",
        result,
      })
    );
  } catch (err) {
    console.error("GetById FacilityDetail Error:", err);
    res.status(err.statusCode || statusCode.INTERNAL_SERVER_ERROR).json(
      apiResponse({
        success: false,
        isException: true,
        statusCode: err.statusCode || statusCode.INTERNAL_SERVER_ERROR,
        message: err.message || "Failed to fetch facility detail",
        result: null,
      })
    );
  }
};

exports.getAll = async (req, res) => {
  try {
    const result = await facilityDetailsService.getAll();
    res.status(statusCode.OK).json(
      apiResponse({
        success: true,
        isException: false,
        statusCode: statusCode.OK,
        message: "Facility details retrieved successfully",
        result,
      })
    );
  } catch (err) {
    console.error("GetAll FacilityDetails Error:", err);
    res.status(err.statusCode || statusCode.INTERNAL_SERVER_ERROR).json(
      apiResponse({
        success: false,
        isException: true,
        statusCode: err.statusCode || statusCode.INTERNAL_SERVER_ERROR,
        message: err.message || "Failed to fetch facility details",
        result: null,
      })
    );
  }
};

exports.remove = async (req, res) => {
  try {
    const result = await facilityDetailsService.remove(req.params.id);
    res.status(statusCode.OK).json(
      apiResponse({
        success: true,
        isException: false,
        statusCode: statusCode.OK,
        message: "Facility detail deleted successfully",
        result,
      })
    );
  } catch (err) {
    console.error("Remove FacilityDetail Error:", err);
    res.status(err.statusCode || statusCode.INTERNAL_SERVER_ERROR).json(
      apiResponse({
        success: false,
        isException: true,
        statusCode: err.statusCode || statusCode.INTERNAL_SERVER_ERROR,
        message: err.message || "Failed to delete facility detail",
        result: null,
      })
    );
  }
};

exports.getDetailsByCategoryId = async (req, res) => {
  try {
    const result = await facilityDetailsService.getDetailsByCategoryId(req.params.categoryId);
    res.status(statusCode.OK).json(
      apiResponse({
        success: true,
        isException: false,
        statusCode: statusCode.OK,
        message: "Facility details by category retrieved successfully",
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
        message: err.message || "Failed to fetch facility details by category",
        result: null,
      })
    );
  }
};