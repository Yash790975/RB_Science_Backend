// ============================================
// News.js
// ============================================

const mongoose = require("mongoose");

const NewsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "News name is required"],
      trim: true,
    },
    slug: {
      type: String,
      required: [true, "News slug is required"],
      trim: true,
    },
    title: {
      type: String,
      required: [true, "News title is required"],
      trim: true,
    },
    excerpt: {
      type: String,
      required: [true, "News excerpt is required"],
      trim: true,
    },
    content: {
      type: [
        {
          heading: {
            type: String,
            required: true,
            trim: true,
          },
          para: {
            type: String,
            required: true,
            trim: true,
          },
        },
      ],
      required: [true, "News content is required"],
    },
    date: {
      type: Date,
      required: [true, "News date is required"],
    },
    publishedAt: {
      type: Date,
      required: [true, "Published date is required"],
    },
    readTime: {
      type: String,
      default: null,
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "NewsCategory",
      required: [true, "Category ID is required"],
    },
    image: {
      type: String,
      default: null,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    collection: "news",
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Compound unique index on name and categoryId
NewsSchema.index({ name: 1, categoryId: 1 }, { unique: true });

// Index for categoryId
NewsSchema.index({ categoryId: 1 });

module.exports = mongoose.model("News", NewsSchema);