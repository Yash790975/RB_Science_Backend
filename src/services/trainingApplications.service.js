const statusCode = require("../enums/statusCode");
const CustomError = require("../exceptions/CustomError");
const TrainingApplications = require("../models/TrainingApplications");
const TrainingPrograms = require("../models/TrainingPrograms");
const mongoose = require("mongoose");

const add = async (req, res) => {
  try {
    const data = req.body;

    // Validate that the preferred program exists
    if (!mongoose.Types.ObjectId.isValid(data.preferred_program_id)) {
      throw new CustomError(
        "Invalid preferred program ID format",
        statusCode.BAD_REQUEST
      );
    }

    const program = await TrainingPrograms.findById(data.preferred_program_id);
    if (!program) {
      throw new CustomError(
        "Preferred training program not found",
        statusCode.NOT_FOUND
      );
    }

    return await TrainingApplications.create(data);
  } catch (error) {
    console.error("Caught error:", error.message);
    throw error;
  }
};

const update = async (req, res) => {
  const { body } = req;

  if (!mongoose.Types.ObjectId.isValid(body.id)) {
    throw new CustomError(
      "Invalid training application ID format",
      statusCode.BAD_REQUEST
    );
  }

  const application = await TrainingApplications.findById(body.id);
  if (!application) {
    throw new CustomError(
      "Training application not found",
      statusCode.NOT_FOUND
    );
  }

  try {
    // Validate preferred_program_id if it's being updated
    if (body.preferred_program_id) {
      if (!mongoose.Types.ObjectId.isValid(body.preferred_program_id)) {
        throw new CustomError(
          "Invalid preferred program ID format",
          statusCode.BAD_REQUEST
        );
      }

      const program = await TrainingPrograms.findById(
        body.preferred_program_id
      );
      if (!program) {
        throw new CustomError(
          "Preferred training program not found",
          statusCode.NOT_FOUND
        );
      }
    }

    // Update fields except id
    Object.keys(body).forEach((key) => {
      if (key !== "id") application[key] = body[key];
    });

    return await application.save();
  } catch (error) {
    throw error;
  }
};

const remove = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new CustomError(
      "Invalid training application ID format",
      statusCode.BAD_REQUEST
    );
  }

  const application = await TrainingApplications.findById(id);
  if (!application) {
    throw new CustomError(
      "Training application not found",
      statusCode.NOT_FOUND
    );
  }

  return await TrainingApplications.findByIdAndDelete(id);
};

const getById = async (id) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new CustomError(
        "Invalid training application ID format",
        statusCode.BAD_REQUEST
      );
    }

    const application = await TrainingApplications.findById(id).populate(
      "preferred_program_id"
    );
    if (!application) {
      throw new CustomError(
        "Training application not found",
        statusCode.NOT_FOUND
      );
    }
    return application;
  } catch (error) {
    throw error;
  }
};

const getAll = async () => {
  try {
    const applications = await TrainingApplications.find()
      .populate("preferred_program_id")
      .sort({ createdAt: -1 });
    return applications;
  } catch (error) {
    throw error;
  }
};

const getByProgramId = async (program_id) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(program_id)) {
      throw new CustomError(
        "Invalid program ID format",
        statusCode.BAD_REQUEST
      );
    }

    const applications = await TrainingApplications.find({
      preferred_program_id: program_id,
    })
      .populate("preferred_program_id")
      .sort({ createdAt: -1 });
    return applications;
  } catch (error) {
    throw error;
  }
};

const getByStatus = async (status) => {
  try {
    const applications = await TrainingApplications.find({ status })
      .populate("preferred_program_id")
      .sort({ createdAt: -1 });
    return applications;
  } catch (error) {
    throw error;
  }
};

const updateStatus = async (id, status) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new CustomError(
        "Invalid training application ID format",
        statusCode.BAD_REQUEST
      );
    }

    const application = await TrainingApplications.findById(id);
    if (!application) {
      throw new CustomError(
        "Training application not found",
        statusCode.NOT_FOUND
      );
    }

    application.status = status;
    return await application.save();
  } catch (error) {
    throw error;
  }
};

module.exports = {
  add,
  update,
  remove,
  getById,
  getAll,
  getByProgramId,
  getByStatus,
  updateStatus,
};