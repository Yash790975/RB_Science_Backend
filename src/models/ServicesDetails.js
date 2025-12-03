

// ============================================
// ServicesDetails.js
// ============================================

const mongoose = require("mongoose");

const ServicesDetailsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Service detail title is required"],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    service_category_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ServiceCategories",
      required: [true, "Service category ID is required"],
    },
    featured: {
      type: [String],
      default: [],
    },
    image_url: {
      type: String,
      trim: true,
    },
    long_description: {
      type: [
        {
          label: {
            type: String,
            required: true,
            trim: true,
          },
          description: {
            type: String,
            required: true,
            trim: true,
          },
        },
      ],
      default: [],
    },
  },
  {
    timestamps: true,
    collection: "services_details",
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Index for service_category_id
ServicesDetailsSchema.index({ service_category_id: 1 });

module.exports = mongoose.model("ServicesDetails", ServicesDetailsSchema);