// ============================================
// NewsCategory.js
// ============================================

const mongoose = require("mongoose");

const NewsCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category name is required"],
      trim: true,
      unique: true,
    },
    category: {
      type: String,
      required: [true, "Category type is required"],
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    collection: "news_category",
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Index for name
NewsCategorySchema.index({ name: 1 }, { unique: true });

module.exports = mongoose.model("NewsCategory", NewsCategorySchema);