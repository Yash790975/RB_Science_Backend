// ============================================
// FacilityCategories.js
// ============================================

const mongoose = require("mongoose");

const FacilityCategoriesSchema = new mongoose.Schema(
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
    facility_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Facilities",
      required: [true, "Facility ID is required"],
    },
    is_active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    collection: "facility_categories",
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Compound unique index on facility_id and title
FacilityCategoriesSchema.index({ facility_id: 1, title: 1 }, { unique: true });

// Index for facility_id
FacilityCategoriesSchema.index({ facility_id: 1 });

module.exports = mongoose.model("FacilityCategories", FacilityCategoriesSchema);