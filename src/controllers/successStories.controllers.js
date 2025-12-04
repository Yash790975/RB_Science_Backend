const successStoriesService = require("../services/successStories.service");
const apiResponse = require("../utils/apiResponse");
const statusCode = require("../enums/statusCode");

exports.add = async (req, res) => {
  try {
    const result = await successStoriesService.add(req, res);
    res.status(statusCode.CREATED).json(
      apiResponse({
        success: true,
        isException: false,
        statusCode: statusCode.CREATED,
        message: "Success story added successfully",
        result,
      })
    );
  } catch (err) {
    console.error("Add SuccessStory Error:", err);
    res.status(err.statusCode || statusCode.INTERNAL_SERVER_ERROR).json(
      apiResponse({
        success: false,
        isException: true,
        statusCode: err.statusCode || statusCode.INTERNAL_SERVER_ERROR,
        message: err.message || "Failed to add success story",
        result: null,
      })
    );
  }
};

exports.update = async (req, res) => {
  try {
    const result = await successStoriesService.update(req, res);
    res.status(statusCode.OK).json(
      apiResponse({
        success: true,
        isException: false,
        statusCode: statusCode.OK,
        message: "Success story updated successfully",
        result,
      })
    );
  } catch (err) {
    console.error("Update SuccessStory Error:", err);
    res.status(err.statusCode || statusCode.INTERNAL_SERVER_ERROR).json(
      apiResponse({
        success: false,
        isException: true,
        statusCode: err.statusCode || statusCode.INTERNAL_SERVER_ERROR,
        message: err.message || "Failed to update success story",
        result: null,
      })
    );
  }
};

exports.getById = async (req, res) => {
  try {
    const result = await successStoriesService.getById(req.params.id);
    res.status(statusCode.OK).json(
      apiResponse({
        success: true,
        isException: false,
        statusCode: statusCode.OK,
        message: "Success story retrieved successfully",
        result,
      })
    );
  } catch (err) {
    console.error("GetById SuccessStory Error:", err);
    res.status(err.statusCode || statusCode.INTERNAL_SERVER_ERROR).json(
      apiResponse({
        success: false,
        isException: true,
        statusCode: err.statusCode || statusCode.INTERNAL_SERVER_ERROR,
        message: err.message || "Failed to fetch success story",
        result: null,
      })
    );
  }
};

exports.getAll = async (req, res) => {
  try {
    const result = await successStoriesService.getAll();
    res.status(statusCode.OK).json(
      apiResponse({
        success: true,
        isException: false,
        statusCode: statusCode.OK,
        message: "Success stories retrieved successfully",
        result,
      })
    );
  } catch (err) {
    console.error("GetAll SuccessStories Error:", err);
    res.status(err.statusCode || statusCode.INTERNAL_SERVER_ERROR).json(
      apiResponse({
        success: false,
        isException: true,
        statusCode: err.statusCode || statusCode.INTERNAL_SERVER_ERROR,
        message: err.message || "Failed to fetch success stories",
        result: null,
      })
    );
  }
};

exports.remove = async (req, res) => {
  try {
    const result = await successStoriesService.remove(req.params.id);
    res.status(statusCode.OK).json(
      apiResponse({
        success: true,
        isException: false,
        statusCode: statusCode.OK,
        message: "Success story deleted successfully",
        result,
      })
    );
  } catch (err) {
    console.error("Remove SuccessStory Error:", err);
    res.status(err.statusCode || statusCode.INTERNAL_SERVER_ERROR).json(
      apiResponse({
        success: false,
        isException: true,
        statusCode: err.statusCode || statusCode.INTERNAL_SERVER_ERROR,
        message: err.message || "Failed to delete success story",
        result: null,
      })
    );
  }
};

exports.getActive = async (req, res) => {
  try {
    const result = await successStoriesService.getActive();
    res.status(statusCode.OK).json(
      apiResponse({
        success: true,
        isException: false,
        statusCode: statusCode.OK,
        message: "Active success stories retrieved successfully",
        result,
      })
    );
  } catch (err) {
    console.error("GetActive SuccessStory Error:", err);
    res.status(err.statusCode || statusCode.INTERNAL_SERVER_ERROR).json(
      apiResponse({
        success: false,
        isException: true,
        statusCode: err.statusCode || statusCode.INTERNAL_SERVER_ERROR,
        message: err.message || "Failed to fetch active success stories",
        result: null,
      })
    );
  }
};