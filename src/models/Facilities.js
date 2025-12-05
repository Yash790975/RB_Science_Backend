// ============================================
// Facilities.js
// ============================================

const mongoose = require("mongoose");

const FacilitiesSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Facility title is required"],
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
    collection: "facilities",
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
); 

// Index for title
FacilitiesSchema.index({ title: 1 }, { unique: true });

module.exports = mongoose.model("Facilities", FacilitiesSchema);