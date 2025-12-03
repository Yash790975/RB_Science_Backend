
// ============================================
// serviceCategories.controllers.js
// ============================================

const serviceCategoriesService = require("../services/serviceCategories.service");
const apiResponse = require("../utils/apiResponse");
const statusCode = require("../enums/statusCode");

exports.add = async (req, res) => {
  try {
    const result = await serviceCategoriesService.add(req, res);
    res.status(statusCode.CREATED).json(
      apiResponse({
        success: true,
        isException: false,
        statusCode: statusCode.CREATED,
        message: "Service category added successfully",
        result,
      })
    );
  } catch (err) {
    console.error("Add ServiceCategory Error:", err);
    res.status(err.statusCode || statusCode.INTERNAL_SERVER_ERROR).json(
      apiResponse({
        success: false,
        isException: true,
        statusCode: err.statusCode || statusCode.INTERNAL_SERVER_ERROR,
        message: err.message || "Failed to add service category",
        result: null,
      })
    );
  }
};

exports.update = async (req, res) => {
  try {
    const result = await serviceCategoriesService.update(req, res);
    res.status(statusCode.OK).json(
      apiResponse({
        success: true,
        isException: false,
        statusCode: statusCode.OK,
        message: "Service category updated successfully",
        result,
      })
    );
  } catch (err) {
    console.error("Update ServiceCategory Error:", err);
    res.status(err.statusCode || statusCode.INTERNAL_SERVER_ERROR).json(
      apiResponse({
        success: false,
        isException: true,
        statusCode: err.statusCode || statusCode.INTERNAL_SERVER_ERROR,
        message: err.message || "Failed to update service category",
        result: null,
      })
    );
  }
};

exports.getById = async (req, res) => {
  try {
    const result = await serviceCategoriesService.getById(req.params.id);
    res.status(statusCode.OK).json(
      apiResponse({
        success: true,
        isException: false,
        statusCode: statusCode.OK,
        message: "Service category retrieved successfully",
        result,
      })
    );
  } catch (err) {
    console.error("GetById ServiceCategory Error:", err);
    res.status(err.statusCode || statusCode.INTERNAL_SERVER_ERROR).json(
      apiResponse({
        success: false,
        isException: true,
        statusCode: err.statusCode || statusCode.INTERNAL_SERVER_ERROR,
        message: err.message || "Failed to fetch service category",
        result: null,
      })
    );
  }
};

exports.getAll = async (req, res) => {
  try {
    const result = await serviceCategoriesService.getAll();
    res.status(statusCode.OK).json(
      apiResponse({
        success: true,
        isException: false,
        statusCode: statusCode.OK,
        message: "Service categories retrieved successfully",
        result,
      })
    );
  } catch (err) {
    console.error("GetAll ServiceCategories Error:", err);
    res.status(err.statusCode || statusCode.INTERNAL_SERVER_ERROR).json(
      apiResponse({
        success: false,
        isException: true,
        statusCode: err.statusCode || statusCode.INTERNAL_SERVER_ERROR,
        message: err.message || "Failed to fetch service categories",
        result: null,
      })
    );
  }
};

exports.remove = async (req, res) => {
  try {
    const result = await serviceCategoriesService.remove(req.params.id);
    res.status(statusCode.OK).json(
      apiResponse({
        success: true,
        isException: false,
        statusCode: statusCode.OK,
        message: "Service category deleted successfully",
        result,
      })
    );
  } catch (err) {
    console.error("Remove ServiceCategory Error:", err);
    res.status(err.statusCode || statusCode.INTERNAL_SERVER_ERROR).json(
      apiResponse({
        success: false,
        isException: true,
        statusCode: err.statusCode || statusCode.INTERNAL_SERVER_ERROR,
        message: err.message || "Failed to delete service category",
        result: null,
      })
    );
  }
};

exports.getActive = async (req, res) => {
  try {
    const result = await serviceCategoriesService.getActive();
    res.status(statusCode.OK).json(
      apiResponse({
        success: true,
        isException: false,
        statusCode: statusCode.OK,
        message: "Active service categories retrieved successfully",
        result,
      })
    );
  } catch (err) {
    console.error("GetActive ServiceCategory Error:", err);
    res.status(err.statusCode || statusCode.INTERNAL_SERVER_ERROR).json(
      apiResponse({
        success: false,
        isException: true,
        statusCode: err.statusCode || statusCode.INTERNAL_SERVER_ERROR,
        message: err.message || "Failed to fetch active service categories",
        result: null,
      })
    );
  }
};

exports.getCategoriesByServiceId = async (req, res) => {
  try {
    const result = await serviceCategoriesService.getCategoriesByServiceId(req.params.serviceId);
    res.status(statusCode.OK).json(
      apiResponse({
        success: true,
        isException: false,
        statusCode: statusCode.OK,
        message: "Categories by service retrieved successfully",
        result,
      })
    );
  } catch (err) {
    console.error("GetCategoriesByServiceId Error:", err);
    res.status(err.statusCode || statusCode.INTERNAL_SERVER_ERROR).json(
      apiResponse({
        success: false,
        isException: true,
        statusCode: err.statusCode || statusCode.INTERNAL_SERVER_ERROR,
        message: err.message || "Failed to fetch categories by service",
        result: null,
      })
    );
  }
};

exports.getActiveCategoriesByServiceId = async (req, res) => {
  try {
    const result = await serviceCategoriesService.getActiveCategoriesByServiceId(req.params.serviceId);
    res.status(statusCode.OK).json(
      apiResponse({
        success: true,
        isException: false,
        statusCode: statusCode.OK,
        message: "Active categories by service retrieved successfully",
        result,
      })
    );
  } catch (err) {
    console.error("GetActiveCategoriesByServiceId Error:", err);
    res.status(err.statusCode || statusCode.INTERNAL_SERVER_ERROR).json(
      apiResponse({
        success: false,
        isException: true,
        statusCode: err.statusCode || statusCode.INTERNAL_SERVER_ERROR,
        message: err.message || "Failed to fetch active categories by service",
        result: null,
      })
    );
  }
};

