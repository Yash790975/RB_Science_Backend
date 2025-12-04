const trainingApplicationsService = require("../services/trainingApplications.service");
const apiResponse = require("../utils/apiResponse");
const statusCode = require("../enums/statusCode");

exports.add = async (req, res) => {
  try {
    const result = await trainingApplicationsService.add(req, res);
    res.status(statusCode.CREATED).json(
      apiResponse({
        success: true,
        isException: false,
        statusCode: statusCode.CREATED,
        message: "Training application submitted successfully",
        result,
      })
    );
  } catch (err) {
    console.error("Add TrainingApplication Error:", err);
    res.status(err.statusCode || statusCode.INTERNAL_SERVER_ERROR).json(
      apiResponse({
        success: false,
        isException: true,
        statusCode: err.statusCode || statusCode.INTERNAL_SERVER_ERROR,
        message: err.message || "Failed to submit training application",
        result: null,
      })
    );
  }
};

exports.update = async (req, res) => {
  try {
    const result = await trainingApplicationsService.update(req, res);
    res.status(statusCode.OK).json(
      apiResponse({
        success: true,
        isException: false,
        statusCode: statusCode.OK,
        message: "Training application updated successfully",
        result,
      })
    );
  } catch (err) {
    console.error("Update TrainingApplication Error:", err);
    res.status(err.statusCode || statusCode.INTERNAL_SERVER_ERROR).json(
      apiResponse({
        success: false,
        isException: true,
        statusCode: err.statusCode || statusCode.INTERNAL_SERVER_ERROR,
        message: err.message || "Failed to update training application",
        result: null,
      })
    );
  }
};

exports.getById = async (req, res) => {
  try {
    const result = await trainingApplicationsService.getById(req.params.id);
    res.status(statusCode.OK).json(
      apiResponse({
        success: true,
        isException: false,
        statusCode: statusCode.OK,
        message: "Training application retrieved successfully",
        result,
      })
    );
  } catch (err) {
    console.error("GetById TrainingApplication Error:", err);
    res.status(err.statusCode || statusCode.INTERNAL_SERVER_ERROR).json(
      apiResponse({
        success: false,
        isException: true,
        statusCode: err.statusCode || statusCode.INTERNAL_SERVER_ERROR,
        message: err.message || "Failed to fetch training application",
        result: null,
      })
    );
  }
};

exports.getAll = async (req, res) => {
  try {
    const result = await trainingApplicationsService.getAll();
    res.status(statusCode.OK).json(
      apiResponse({
        success: true,
        isException: false,
        statusCode: statusCode.OK,
        message: "Training applications retrieved successfully",
        result,
      })
    );
  } catch (err) {
    console.error("GetAll TrainingApplications Error:", err);
    res.status(err.statusCode || statusCode.INTERNAL_SERVER_ERROR).json(
      apiResponse({
        success: false,
        isException: true,
        statusCode: err.statusCode || statusCode.INTERNAL_SERVER_ERROR,
        message: err.message || "Failed to fetch training applications",
        result: null,
      })
    );
  }
};

exports.remove = async (req, res) => {
  try {
    const result = await trainingApplicationsService.remove(req.params.id);
    res.status(statusCode.OK).json(
      apiResponse({
        success: true,
        isException: false,
        statusCode: statusCode.OK,
        message: "Training application deleted successfully",
        result,
      })
    );
  } catch (err) {
    console.error("Remove TrainingApplication Error:", err);
    res.status(err.statusCode || statusCode.INTERNAL_SERVER_ERROR).json(
      apiResponse({
        success: false,
        isException: true,
        statusCode: err.statusCode || statusCode.INTERNAL_SERVER_ERROR,
        message: err.message || "Failed to delete training application",
        result: null,
      })
    );
  }
};

exports.getByProgramId = async (req, res) => {
  try {
    const result = await trainingApplicationsService.getByProgramId(
      req.params.program_id
    );
    res.status(statusCode.OK).json(
      apiResponse({
        success: true,
        isException: false,
        statusCode: statusCode.OK,
        message: "Training applications retrieved successfully",
        result,
      })
    );
  } catch (err) {
    console.error("GetByProgramId TrainingApplication Error:", err);
    res.status(err.statusCode || statusCode.INTERNAL_SERVER_ERROR).json(
      apiResponse({
        success: false,
        isException: true,
        statusCode: err.statusCode || statusCode.INTERNAL_SERVER_ERROR,
        message: err.message || "Failed to fetch training applications",
        result: null,
      })
    );
  }
};

exports.getByStatus = async (req, res) => {
  try {
    const result = await trainingApplicationsService.getByStatus(
      req.params.status
    );
    res.status(statusCode.OK).json(
      apiResponse({
        success: true,
        isException: false,
        statusCode: statusCode.OK,
        message: "Training applications retrieved successfully",
        result,
      })
    );
  } catch (err) {
    console.error("GetByStatus TrainingApplication Error:", err);
    res.status(err.statusCode || statusCode.INTERNAL_SERVER_ERROR).json(
      apiResponse({
        success: false,
        isException: true,
        statusCode: err.statusCode || statusCode.INTERNAL_SERVER_ERROR,
        message: err.message || "Failed to fetch training applications",
        result: null,
      })
    );
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const { id, status } = req.body;
    const result = await trainingApplicationsService.updateStatus(id, status);
    res.status(statusCode.OK).json(
      apiResponse({
        success: true,
        isException: false,
        statusCode: statusCode.OK,
        message: "Application status updated successfully",
        result,
      })
    );
  } catch (err) {
    console.error("UpdateStatus TrainingApplication Error:", err);
    res.status(err.statusCode || statusCode.INTERNAL_SERVER_ERROR).json(
      apiResponse({
        success: false,
        isException: true,
        statusCode: err.statusCode || statusCode.INTERNAL_SERVER_ERROR,
        message: err.message || "Failed to update application status",
        result: null,
      })
    );
  }
};