// ============================================
// facilityCategories.controllers.js
// ============================================

const facilityCategoriesService = require("../services/facilityCategories.service");
const apiResponse = require("../utils/apiResponse");
const statusCode = require("../enums/statusCode");

exports.add = async (req, res) => {
  try {
    const result = await facilityCategoriesService.add(req, res);
    res.status(statusCode.CREATED).json(
      apiResponse({
        success: true,
        isException: false,
        statusCode: statusCode.CREATED,
        message: "Facility category added successfully",
        result,
      })
    );
  } catch (err) {
    console.error("Add FacilityCategory Error:", err);
    res.status(err.statusCode || statusCode.INTERNAL_SERVER_ERROR).json(
      apiResponse({
        success: false,
        isException: true,
        statusCode: err.statusCode || statusCode.INTERNAL_SERVER_ERROR,
        message: err.message || "Failed to add facility category",
        result: null,
      })
    );
  }
};

exports.update = async (req, res) => {
  try {
    const result = await facilityCategoriesService.update(req, res);
    res.status(statusCode.OK).json(
      apiResponse({
        success: true,
        isException: false,
        statusCode: statusCode.OK,
        message: "Facility category updated successfully",
        result,
      })
    );
  } catch (err) {
    console.error("Update FacilityCategory Error:", err);
    res.status(err.statusCode || statusCode.INTERNAL_SERVER_ERROR).json(
      apiResponse({
        success: false,
        isException: true,
        statusCode: err.statusCode || statusCode.INTERNAL_SERVER_ERROR,
        message: err.message || "Failed to update facility category",
        result: null,
      })
    );
  }
};

exports.getById = async (req, res) => {
  try {
    const result = await facilityCategoriesService.getById(req.params.id);
    res.status(statusCode.OK).json(
      apiResponse({
        success: true,
        isException: false,
        statusCode: statusCode.OK,
        message: "Facility category retrieved successfully",
        result,
      })
    );
  } catch (err) {
    console.error("GetById FacilityCategory Error:", err);
    res.status(err.statusCode || statusCode.INTERNAL_SERVER_ERROR).json(
      apiResponse({
        success: false,
        isException: true,
        statusCode: err.statusCode || statusCode.INTERNAL_SERVER_ERROR,
        message: err.message || "Failed to fetch facility category",
        result: null,
      })
    );
  }
};

exports.getAll = async (req, res) => {
  try {
    const result = await facilityCategoriesService.getAll();
    res.status(statusCode.OK).json(
      apiResponse({
        success: true,
        isException: false,
        statusCode: statusCode.OK,
        message: "Facility categories retrieved successfully",
        result,
      })
    );
  } catch (err) {
    console.error("GetAll FacilityCategories Error:", err);
    res.status(err.statusCode || statusCode.INTERNAL_SERVER_ERROR).json(
      apiResponse({
        success: false,
        isException: true,
        statusCode: err.statusCode || statusCode.INTERNAL_SERVER_ERROR,
        message: err.message || "Failed to fetch facility categories",
        result: null,
      })
    );
  }
};

exports.remove = async (req, res) => {
  try {
    const result = await facilityCategoriesService.remove(req.params.id);
    res.status(statusCode.OK).json(
      apiResponse({
        success: true,
        isException: false,
        statusCode: statusCode.OK,
        message: "Facility category deleted successfully",
        result,
      })
    );
  } catch (err) {
    console.error("Remove FacilityCategory Error:", err);
    res.status(err.statusCode || statusCode.INTERNAL_SERVER_ERROR).json(
      apiResponse({
        success: false,
        isException: true,
        statusCode: err.statusCode || statusCode.INTERNAL_SERVER_ERROR,
        message: err.message || "Failed to delete facility category",
        result: null,
      })
    );
  }
};

exports.getActive = async (req, res) => {
  try {
    const result = await facilityCategoriesService.getActive();
    res.status(statusCode.OK).json(
      apiResponse({
        success: true,
        isException: false,
        statusCode: statusCode.OK,
        message: "Active facility categories retrieved successfully",
        result,
      })
    );
  } catch (err) {
    console.error("GetActive FacilityCategory Error:", err);
    res.status(err.statusCode || statusCode.INTERNAL_SERVER_ERROR).json(
      apiResponse({
        success: false,
        isException: true,
        statusCode: err.statusCode || statusCode.INTERNAL_SERVER_ERROR,
        message: err.message || "Failed to fetch active facility categories",
        result: null,
      })
    );
  }
};

exports.getCategoriesByFacilityId = async (req, res) => {
  try {
    const result = await facilityCategoriesService.getCategoriesByFacilityId(req.params.facilityId);
    res.status(statusCode.OK).json(
      apiResponse({
        success: true,
        isException: false,
        statusCode: statusCode.OK,
        message: "Categories by facility retrieved successfully",
        result,
      })
    );
  } catch (err) {
    console.error("GetCategoriesByFacilityId Error:", err);
    res.status(err.statusCode || statusCode.INTERNAL_SERVER_ERROR).json(
      apiResponse({
        success: false,
        isException: true,
        statusCode: err.statusCode || statusCode.INTERNAL_SERVER_ERROR,
        message: err.message || "Failed to fetch categories by facility",
        result: null,
      })
    );
  }
};

exports.getActiveCategoriesByFacilityId = async (req, res) => {
  try {
    const result = await facilityCategoriesService.getActiveCategoriesByFacilityId(req.params.facilityId);
    res.status(statusCode.OK).json(
      apiResponse({
        success: true,
        isException: false,
        statusCode: statusCode.OK,
        message: "Active categories by facility retrieved successfully",
        result,
      })
    );
  } catch (err) {
    console.error("GetActiveCategoriesByFacilityId Error:", err);
    res.status(err.statusCode || statusCode.INTERNAL_SERVER_ERROR).json(
      apiResponse({
        success: false,
        isException: true,
        statusCode: err.statusCode || statusCode.INTERNAL_SERVER_ERROR,
        message: err.message || "Failed to fetch active categories by facility",
        result: null,
      })
    );
  }
};