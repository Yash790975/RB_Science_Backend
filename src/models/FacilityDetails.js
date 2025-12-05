// ============================================
// FacilityDetails.js
// ============================================

const mongoose = require("mongoose");

const FacilityDetailsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Facility detail title is required"],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    facility_category_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FacilityCategories",
      required: [true, "Facility category ID is required"],
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
    collection: "facility_details",
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Index for facility_category_id
FacilityDetailsSchema.index({ facility_category_id: 1 });

module.exports = mongoose.model("FacilityDetails", FacilityDetailsSchema);