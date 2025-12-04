const mongoose = require("mongoose");

const SuccessStoriesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    position: {
      type: String,
      required: [true, "Position is required"],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    image: {
      type: String,
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    collection: "success_stories",
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Index for faster queries
SuccessStoriesSchema.index({ isActive: 1 });

module.exports = mongoose.model("SuccessStories", SuccessStoriesSchema);