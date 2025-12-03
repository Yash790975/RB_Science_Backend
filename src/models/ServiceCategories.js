
// ============================================
// ServiceCategories.js
// ============================================

const mongoose = require("mongoose");

const ServiceCategoriesSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Category title is required"],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    service_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Services",
      required: [true, "Service ID is required"],
    },
    is_active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    collection: "service_categories",
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Compound unique index on service_id and title
ServiceCategoriesSchema.index({ service_id: 1, title: 1 }, { unique: true });

// Index for service_id
ServiceCategoriesSchema.index({ service_id: 1 });

module.exports = mongoose.model("ServiceCategories", ServiceCategoriesSchema);
