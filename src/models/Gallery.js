// ============================================
// Gallery.js
// ============================================

const mongoose = require("mongoose");

const GallerySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Gallery title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Gallery description is required"],
      trim: true,
    },
    image_url: {
      type: String,
      required: [true, "Gallery image is required"],
      trim: true,
    },
  },
  {
    timestamps: true,
    collection: "gallery",
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

module.exports = mongoose.model("Gallery", GallerySchema);