const statusCode = require("../enums/statusCode");
const Event = require("../models/Event");
const CustomError = require("../exceptions/CustomError");
const fs = require("fs");
const path = require("path");
const { UPLOADS_ROOT } = require("../middlewares/upload");
const mongoose = require("mongoose");

const add = async (req, res) => {
  const uploadedFiles = [];
  try {
    const data = req.body;
    const files = req.files;

    // Parse JSON fields
    if (typeof data.location === "string") {
      try {
        data.location = JSON.parse(data.location);
      } catch {
        throw new CustomError("Invalid location format", statusCode.BAD_REQUEST);
      }
    }

    // Validate required nested fields
    if (!data.location?.city || !data.location?.country) {
      throw new CustomError("Location must have city and country", statusCode.BAD_REQUEST);
    }

    // Parse other JSON fields
    const jsonFields = [
      "awards", "registration_fees", "schedule", "venue",
      "payment_details", "important_dates", "guests", "about"
    ];

    jsonFields.forEach(field => {
      if (typeof data[field] === "string") {
        try {
          data[field] = JSON.parse(data[field]);
        } catch {
          // Ignore parse errors for optional fields
        }
      }
    });

    // Handle brochure file upload
    let brochureData = null;
    if (files?.brochure?.[0]) {
      const brochureRelativePath = path.join("uploads", "events", files.brochure[0].filename);
      const brochureFullPath = path.join(UPLOADS_ROOT, "events", files.brochure[0].filename);
      uploadedFiles.push(brochureFullPath);

      brochureData = {
        available: true,
        label: data.brochure_label || "Download Brochure",
        link: brochureRelativePath
      };
    }

    if (brochureData) {
      data.brochure = brochureData;
    }

    // Check for duplicate event (title + year)
    const existingEvent = await Event.findOne({
      title: data.title,
      year: data.year
    });

    if (existingEvent) {
      throw new CustomError(
        "Event with this title already exists for this year",
        statusCode.CONFLICT
      );
    }

    // Create event
    const event = await Event.create(data);
    return event;
  } catch (error) {
    // Cleanup uploaded files on error
    for (const filePath of uploadedFiles) {
      try {
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      } catch {}
    }
    throw error;
  }
};

const getById = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new CustomError("Invalid Event ID format", statusCode.BAD_REQUEST);
  }

  const event = await Event.findById(id);
  if (!event) {
    throw new CustomError("Event not found", statusCode.NOT_FOUND);
  }
  return event;
};

const getAll = async () => {
  const events = await Event.find({}).sort({ year: -1, createdAt: -1 });
  return events;
};

const update = async (req, res) => {
  const { body, files } = req;
  const uploadedFiles = [];

  if (!mongoose.Types.ObjectId.isValid(body.id)) {
    // Cleanup temp files
    if (files?.brochure?.[0]) {
      const tempFile = path.join(UPLOADS_ROOT, "events", files.brochure[0].filename);
      if (fs.existsSync(tempFile)) fs.unlinkSync(tempFile);
    }
    throw new CustomError("Invalid Event ID format", statusCode.BAD_REQUEST);
  }

  const event = await Event.findById(body.id);
  if (!event) {
    // Cleanup temp files
    if (files?.brochure?.[0]) {
      const tempFile = path.join(UPLOADS_ROOT, "events", files.brochure[0].filename);
      if (fs.existsSync(tempFile)) fs.unlinkSync(tempFile);
    }
    throw new CustomError("Event not found", statusCode.NOT_FOUND);
  }

  try {
    // Update simple fields
    if (body.title !== undefined) event.title = body.title;
    if (body.subtitle !== undefined) event.subtitle = body.subtitle;
    if (body.registration_link !== undefined) event.registration_link = body.registration_link;
    if (body.year !== undefined) event.year = body.year;
    if (body.email !== undefined) event.email = body.email;
    if (body.event_type !== undefined) event.event_type = body.event_type;
    if (body.abstract_deadline !== undefined) event.abstract_deadline = body.abstract_deadline;
    if (body.featured_event !== undefined) event.featured_event = body.featured_event;

    // Parse and update JSON fields
    const jsonFields = [
      "location", "awards", "registration_fees", "schedule",
      "venue", "payment_details", "important_dates", "guests", "about"
    ];

    jsonFields.forEach(field => {
      if (body[field] !== undefined) {
        event[field] = typeof body[field] === "string" ? JSON.parse(body[field]) : body[field];
      }
    });

    // Check for title + year uniqueness if changed
    if (body.title || body.year) {
      const conflict = await Event.findOne({
        _id: { $ne: body.id },
        title: event.title,
        year: event.year
      });

      if (conflict) {
        throw new CustomError(
          "Another event with this title already exists for this year",
          statusCode.CONFLICT
        );
      }
    }

    // Handle brochure file update
    if (files?.brochure?.[0]) {
      const newBrochureRelPath = path.join("uploads", "events", files.brochure[0].filename);
      const newBrochureFullPath = path.join(UPLOADS_ROOT, "events", files.brochure[0].filename);
      uploadedFiles.push(newBrochureFullPath);

      // Delete old brochure file
      if (event.brochure?.link) {
        const oldBrochureFullPath = path.resolve(
          path.join(UPLOADS_ROOT, event.brochure.link.replace(/^uploads[\\/]/, ""))
        );
        if (fs.existsSync(oldBrochureFullPath)) fs.unlinkSync(oldBrochureFullPath);
      }

      event.brochure = {
        available: true,
        label: body.brochure_label || event.brochure?.label || "Download Brochure",
        link: newBrochureRelPath
      };
    }

    const updatedEvent = await event.save();
    return updatedEvent;
  } catch (error) {
    // Cleanup newly uploaded files on error
    for (const filePath of uploadedFiles) {
      try {
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      } catch {}
    }
    throw error;
  }
};

const remove = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new CustomError("Invalid Event ID format", statusCode.BAD_REQUEST);
  }

  const event = await Event.findById(id);
  if (!event) {
    throw new CustomError("Event not found", statusCode.NOT_FOUND);
  }

  // Delete brochure file
  if (event.brochure?.link) {
    const relativePath = event.brochure.link.replace(/^uploads[\\/]/, "");
    const brochureFullPath = path.resolve(path.join(UPLOADS_ROOT, relativePath));
    try {
      if (fs.existsSync(brochureFullPath)) fs.unlinkSync(brochureFullPath);
    } catch (err) {
      console.error("Failed to delete brochure:", brochureFullPath, err);
    }
  }

  const deletedEvent = await Event.findByIdAndDelete(id);
  return deletedEvent;
};

const getFeaturedEvents = async () => {
  const events = await Event.find({ featured_event: true }).sort({ year: -1, createdAt: -1 });
  return events;
};

const getByYear = async (year) => {
  const events = await Event.find({ year: parseInt(year) }).sort({ createdAt: -1 });
  return events;
};

module.exports = {
  add,
  getById,
  getAll,
  update,
  remove,
  getFeaturedEvents,
  getByYear
};