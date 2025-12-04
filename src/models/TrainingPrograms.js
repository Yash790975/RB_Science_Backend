const mongoose = require("mongoose");

const TrainingProgramsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Training program title is required"],
      trim: true,
    },
    screen_name: {
      type: String,
      required: [true, "Screen name is required"],
      trim: true,
      enum: {
        values: ["internship", "full-time"],
        message: "Screen name must be either 'internship' or 'full-time'",
      },
    },
    description: {
      type: String,
      trim: true,
    },
    image: {
      type: String,
      trim: true,
    },
    weeks: {
      type: String,
      required: [true, "Duration in weeks is required"],
      trim: true,
    },
    fees: {
      type: String,
      required: [true, "Fees is required"],
      default: "0",
      trim: true,
    },
    features: {
      type: [String],
      required: [true, "At least one feature is required"],
      validate: {
        validator: function (v) {
          return Array.isArray(v) && v.length > 0;
        },
        message: "Features array cannot be empty",
      },
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    collection: "training_programs",
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Index for screen_name for faster queries
TrainingProgramsSchema.index({ screen_name: 1 });
TrainingProgramsSchema.index({ isActive: 1 });

module.exports = mongoose.model("TrainingPrograms", TrainingProgramsSchema);