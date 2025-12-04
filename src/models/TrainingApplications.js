const mongoose = require("mongoose");

const TrainingApplicationsSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please provide a valid email address",
      ],
    },
    phoneNumber: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
    },
    education_level: {
      type: String,
      required: [true, "Education level is required"],
      trim: true,
    },
    preferred_program_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TrainingPrograms",
      required: [true, "Preferred program is required"],
    },
    reason: {
      type: String,
      required: [true, "Reason for application is required"],
      trim: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  {
    timestamps: true,
    collection: "training_applications",
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Indexes for faster queries
TrainingApplicationsSchema.index({ preferred_program_id: 1 });
TrainingApplicationsSchema.index({ email: 1 });
TrainingApplicationsSchema.index({ status: 1 });

module.exports = mongoose.model("TrainingApplications", TrainingApplicationsSchema);