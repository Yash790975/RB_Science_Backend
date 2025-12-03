const eventsService = require("../services/events.service");
const apiResponse = require("../utils/apiResponse");
const statusCode = require("../enums/statusCode");

exports.add = async (req, res) => {
  try {
    const result = await eventsService.add(req, res);
    res.status(statusCode.CREATED).json(
      apiResponse({
        success: true,
        isException: false,
        statusCode: statusCode.CREATED,
        message: "Event created successfully",
        result,
      })
    );
  } catch (err) {
    console.error("Create Event Error:", err.message);
    res.status(err.statusCode || 500).json(
      apiResponse({
        success: false,
        isException: true,
        statusCode: err.statusCode || 500,
        result: null,
        message: err.message || "Something went wrong while creating event",
      })
    );
  }
};

exports.update = async (req, res) => {
  try {
    const result = await eventsService.update(req, res);
    res.status(statusCode.OK).json(
      apiResponse({
        success: true,
        isException: false,
        statusCode: statusCode.OK,
        message: "Event updated successfully",
        result,
      })
    );
  } catch (err) {
    console.error("Update Event Error:", err.message);
    res.status(err.statusCode || 500).json(
      apiResponse({
        success: false,
        isException: true,
        statusCode: err.statusCode || 500,
        result: null,
        message: err.message || "Something went wrong while updating event",
      })
    );
  }
};

exports.getAll = async (req, res) => {
  try {
    const events = await eventsService.getAll();
    res.status(statusCode.OK).json(
      apiResponse({
        success: true,
        isException: false,
        statusCode: statusCode.OK,
        message: "Events retrieved successfully",
        result: events,
      })
    );
  } catch (err) {
    console.error("GetAll Events Error:", err);
    res.status(500).json(
      apiResponse({
        success: false,
        isException: true,
        statusCode: 500,
        result: null,
        message: err.message || "Failed to fetch events",
      })
    );
  }
};

exports.getById = async (req, res) => {
  try {
    const event = await eventsService.getById(req.params.id);
    res.status(statusCode.OK).json(
      apiResponse({
        success: true,
        isException: false,
        statusCode: statusCode.OK,
        message: "Event retrieved successfully",
        result: event,
      })
    );
  } catch (err) {
    console.error("GetById Event Error:", err);
    res.status(err.statusCode || 500).json(
      apiResponse({
        success: false,
        isException: true,
        statusCode: err.statusCode || 500,
        result: null,
        message: err.message || "Event not found",
      })
    );
  }
};

exports.remove = async (req, res) => {
  try {
    await eventsService.remove(req.params.id);
    res.status(statusCode.OK).json(
      apiResponse({
        success: true,
        isException: false,
        statusCode: statusCode.OK,
        message: "Event deleted successfully",
      })
    );
  } catch (err) {
    console.error("Remove Event Error:", err);
    res.status(err.statusCode || 500).json(
      apiResponse({
        success: false,
        isException: true,
        statusCode: err.statusCode || 500,
        result: null,
        message: err.message || "Failed to delete event",
      })
    );
  }
};

exports.getFeatured = async (req, res) => {
  try {
    const events = await eventsService.getFeaturedEvents();
    res.status(statusCode.OK).json(
      apiResponse({
        success: true,
        isException: false,
        statusCode: statusCode.OK,
        message: "Featured events retrieved successfully",
        result: events,
      })
    );
  } catch (err) {
    console.error("Get Featured Events Error:", err);
    res.status(500).json(
      apiResponse({
        success: false,
        isException: true,
        statusCode: 500,
        result: null,
        message: err.message || "Failed to fetch featured events",
      })
    );
  }
};

exports.getByYear = async (req, res) => {
  try {
    const events = await eventsService.getByYear(req.params.year);
    res.status(statusCode.OK).json(
      apiResponse({
        success: true,
        isException: false,
        statusCode: statusCode.OK,
        message: "Events retrieved successfully by year",
        result: events,
      })
    );
  } catch (err) {
    console.error("Get Events By Year Error:", err);
    res.status(500).json(
      apiResponse({
        success: false,
        isException: true,
        statusCode: 500,
        result: null,
        message: err.message || "Failed to fetch events by year",
      })
    );
  }
};