// ============================================
// Services.js
// ============================================

const mongoose = require("mongoose");

const ServicesSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Service title is required"],
      trim: true,
      unique: true,
    },
    is_active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    collection: "services",
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Index for title
ServicesSchema.index({ title: 1 }, { unique: true });

module.exports = mongoose.model("Services", ServicesSchema);

