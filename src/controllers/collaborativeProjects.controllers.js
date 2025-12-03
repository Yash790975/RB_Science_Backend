
// ============================================
// collaborativeProjects.controllers.js
// ============================================
const collaborativeProjectsService = require("../services/collaborativeProjects.service");
const apiResponse = require("../utils/apiResponse");
const statusCode = require("../enums/statusCode");

exports.add = async (req, res) => {
  try {
    const result = await collaborativeProjectsService.add(req, res);
    res.status(statusCode.CREATED).json(
      apiResponse({
        success: true,
        isException: false,
        statusCode: statusCode.CREATED,
        message: "Collaborative project added successfully",
        result,
      })
    );
  } catch (err) {
    console.error("Add CollaborativeProject Error:", err);
    res.status(err.statusCode || statusCode.INTERNAL_SERVER_ERROR).json(
      apiResponse({
        success: false,
        isException: true,
        statusCode: err.statusCode || statusCode.INTERNAL_SERVER_ERROR,
        message: err.message || "Failed to add collaborative project",
        result: null,
      })
    );
  }
};

exports.update = async (req, res) => {
  try {
    const result = await collaborativeProjectsService.update(req, res);
    res.status(statusCode.OK).json(
      apiResponse({
        success: true,
        isException: false,
        statusCode: statusCode.OK,
        message: "Collaborative project updated successfully",
        result,
      })
    );
  } catch (err) {
    console.error("Update CollaborativeProject Error:", err);
    res.status(err.statusCode || statusCode.INTERNAL_SERVER_ERROR).json(
      apiResponse({
        success: false,
        isException: true,
        statusCode: err.statusCode || statusCode.INTERNAL_SERVER_ERROR,
        message: err.message || "Failed to update collaborative project",
        result: null,
      })
    );
  }
};

exports.getById = async (req, res) => {
  try {
    const result = await collaborativeProjectsService.getById(req.params.id);
    res.status(statusCode.OK).json(
      apiResponse({
        success: true,
        isException: false,
        statusCode: statusCode.OK,
        message: "Collaborative project retrieved successfully",
        result,
      })
    );
  } catch (err) {
    console.error("GetById CollaborativeProject Error:", err);
    res.status(err.statusCode || statusCode.INTERNAL_SERVER_ERROR).json(
      apiResponse({
        success: false,
        isException: true,
        statusCode: err.statusCode || statusCode.INTERNAL_SERVER_ERROR,
        message: err.message || "Failed to fetch collaborative project",
        result: null,
      })
    );
  }
};

exports.getAll = async (req, res) => {
  try {
    const result = await collaborativeProjectsService.getAll();
    res.status(statusCode.OK).json(
      apiResponse({
        success: true,
        isException: false,
        statusCode: statusCode.OK,
        message: "Collaborative projects retrieved successfully",
        result,
      })
    );
  } catch (err) {
    console.error("GetAll CollaborativeProjects Error:", err);
    res.status(err.statusCode || statusCode.INTERNAL_SERVER_ERROR).json(
      apiResponse({
        success: false,
        isException: true,
        statusCode: err.statusCode || statusCode.INTERNAL_SERVER_ERROR,
        message: err.message || "Failed to fetch collaborative projects",
        result: null,
      })
    );
  }
};

exports.remove = async (req, res) => {
  try {
    const result = await collaborativeProjectsService.remove(req.params.id);
    res.status(statusCode.OK).json(
      apiResponse({
        success: true,
        isException: false,
        statusCode: statusCode.OK,
        message: "Collaborative project deleted successfully",
        result,
      })
    );
  } catch (err) {
    console.error("Remove CollaborativeProject Error:", err);
    res.status(err.statusCode || statusCode.INTERNAL_SERVER_ERROR).json(
      apiResponse({
        success: false,
        isException: true,
        statusCode: err.statusCode || statusCode.INTERNAL_SERVER_ERROR,
        message: err.message || "Failed to delete collaborative project",
        result: null,
      })
    );
  }
};

exports.getActive = async (req, res) => {
  try {
    const result = await collaborativeProjectsService.getActive();
    res.status(statusCode.OK).json(
      apiResponse({
        success: true,
        isException: false,
        statusCode: statusCode.OK,
        message: "Active collaborative projects retrieved successfully",
        result,
      })
    );
  } catch (err) {
    console.error("GetActive CollaborativeProject Error:", err);
    res.status(err.statusCode || statusCode.INTERNAL_SERVER_ERROR).json(
      apiResponse({
        success: false,
        isException: true,
        statusCode: err.statusCode || statusCode.INTERNAL_SERVER_ERROR,
        message: err.message || "Failed to fetch active collaborative projects",
        result: null,
      })
    );
  }
};

exports.getByUniversity = async (req, res) => {
  try {
    const result = await collaborativeProjectsService.getByUniversity(req.params.university);
    res.status(statusCode.OK).json(
      apiResponse({
        success: true,
        isException: false,
        statusCode: statusCode.OK,
        message: "Projects by university retrieved successfully",
        result,
      })
    );
  } catch (err) {
    console.error("GetByUniversity CollaborativeProject Error:", err);
    res.status(err.statusCode || statusCode.INTERNAL_SERVER_ERROR).json(
      apiResponse({
        success: false,
        isException: true,
        statusCode: err.statusCode || statusCode.INTERNAL_SERVER_ERROR,
        message: err.message || "Failed to fetch projects by university",
        result: null,
      })
    );
  }
};
