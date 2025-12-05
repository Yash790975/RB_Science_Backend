// ============================================
// Certificates.js
// ============================================

const mongoose = require("mongoose");

const CertificatesSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Certificate title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Certificate description is required"],
      trim: true,
    },
    featured: {
      type: [String],
      default: [],
    },
    image_url: {
      type: String,
      required: [true, "Certificate image is required"],
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
    collection: "certificates",
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

module.exports = mongoose.model("Certificates", CertificatesSchema);