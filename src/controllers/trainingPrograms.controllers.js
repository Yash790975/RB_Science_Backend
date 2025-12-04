const trainingProgramsService = require("../services/trainingPrograms.service");
const apiResponse = require("../utils/apiResponse");
const statusCode = require("../enums/statusCode");

exports.add = async (req, res) => {
  try {
    const result = await trainingProgramsService.add(req, res);
    res.status(statusCode.CREATED).json(
      apiResponse({
        success: true,
        isException: false,
        statusCode: statusCode.CREATED,
        message: "Training program added successfully",
        result,
      })
    );
  } catch (err) {
    console.error("Add TrainingProgram Error:", err);
    res.status(err.statusCode || statusCode.INTERNAL_SERVER_ERROR).json(
      apiResponse({
        success: false,
        isException: true,
        statusCode: err.statusCode || statusCode.INTERNAL_SERVER_ERROR,
        message: err.message || "Failed to add training program",
        result: null,
      })
    );
  }
};

exports.update = async (req, res) => {
  try {
    const result = await trainingProgramsService.update(req, res);
    res.status(statusCode.OK).json(
      apiResponse({
        success: true,
        isException: false,
        statusCode: statusCode.OK,
        message: "Training program updated successfully",
        result,
      })
    );
  } catch (err) {
    console.error("Update TrainingProgram Error:", err);
    res.status(err.statusCode || statusCode.INTERNAL_SERVER_ERROR).json(
      apiResponse({
        success: false,
        isException: true,
        statusCode: err.statusCode || statusCode.INTERNAL_SERVER_ERROR,
        message: err.message || "Failed to update training program",
        result: null,
      })
    );
  }
};

exports.getById = async (req, res) => {
  try {
    const result = await trainingProgramsService.getById(req.params.id);
    res.status(statusCode.OK).json(
      apiResponse({
        success: true,
        isException: false,
        statusCode: statusCode.OK,
        message: "Training program retrieved successfully",
        result,
      })
    );
  } catch (err) {
    console.error("GetById TrainingProgram Error:", err);
    res.status(err.statusCode || statusCode.INTERNAL_SERVER_ERROR).json(
      apiResponse({
        success: false,
        isException: true,
        statusCode: err.statusCode || statusCode.INTERNAL_SERVER_ERROR,
        message: err.message || "Failed to fetch training program",
        result: null,
      })
    );
  }
};

exports.getAll = async (req, res) => {
  try {
    const result = await trainingProgramsService.getAll();
    res.status(statusCode.OK).json(
      apiResponse({
        success: true,
        isException: false,
        statusCode: statusCode.OK,
        message: "Training programs retrieved successfully",
        result,
      })
    );
  } catch (err) {
    console.error("GetAll TrainingPrograms Error:", err);
    res.status(err.statusCode || statusCode.INTERNAL_SERVER_ERROR).json(
      apiResponse({
        success: false,
        isException: true,
        statusCode: err.statusCode || statusCode.INTERNAL_SERVER_ERROR,
        message: err.message || "Failed to fetch training programs",
        result: null,
      })
    );
  }
};

exports.remove = async (req, res) => {
  try {
    const result = await trainingProgramsService.remove(req.params.id);
    res.status(statusCode.OK).json(
      apiResponse({
        success: true,
        isException: false,
        statusCode: statusCode.OK,
        message: "Training program deleted successfully",
        result,
      })
    );
  } catch (err) {
    console.error("Remove TrainingProgram Error:", err);
    res.status(err.statusCode || statusCode.INTERNAL_SERVER_ERROR).json(
      apiResponse({
        success: false,
        isException: true,
        statusCode: err.statusCode || statusCode.INTERNAL_SERVER_ERROR,
        message: err.message || "Failed to delete training program",
        result: null,
      })
    );
  }
};

exports.getActive = async (req, res) => {
  try {
    const result = await trainingProgramsService.getActive();
    res.status(statusCode.OK).json(
      apiResponse({
        success: true,
        isException: false,
        statusCode: statusCode.OK,
        message: "Active training programs retrieved successfully",
        result,
      })
    );
  } catch (err) {
    console.error("GetActive TrainingProgram Error:", err);
    res.status(err.statusCode || statusCode.INTERNAL_SERVER_ERROR).json(
      apiResponse({
        success: false,
        isException: true,
        statusCode: err.statusCode || statusCode.INTERNAL_SERVER_ERROR,
        message: err.message || "Failed to fetch active training programs",
        result: null,
      })
    );
  }
};

exports.getByScreenName = async (req, res) => {
  try {
    const result = await trainingProgramsService.getByScreenName(
      req.params.screen_name
    );
    res.status(statusCode.OK).json(
      apiResponse({
        success: true,
        isException: false,
        statusCode: statusCode.OK,
        message: "Training programs retrieved successfully",
        result,
      })
    );
  } catch (err) {
    console.error("GetByScreenName TrainingProgram Error:", err);
    res.status(err.statusCode || statusCode.INTERNAL_SERVER_ERROR).json(
      apiResponse({
        success: false,
        isException: true,
        statusCode: err.statusCode || statusCode.INTERNAL_SERVER_ERROR,
        message: err.message || "Failed to fetch training programs",
        result: null,
      })
    );
  }
};

exports.getActiveByScreenName = async (req, res) => {
  try {
    const result = await trainingProgramsService.getActiveByScreenName(
      req.params.screen_name
    );
    res.status(statusCode.OK).json(
      apiResponse({
        success: true,
        isException: false,
        statusCode: statusCode.OK,
        message: "Active training programs retrieved successfully",
        result,
      })
    );
  } catch (err) {
    console.error("GetActiveByScreenName TrainingProgram Error:", err);
    res.status(err.statusCode || statusCode.INTERNAL_SERVER_ERROR).json(
      apiResponse({
        success: false,
        isException: true,
        statusCode: err.statusCode || statusCode.INTERNAL_SERVER_ERROR,
        message: err.message || "Failed to fetch active training programs",
        result: null,
      })
    );
  }
};