const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Event title is required"],
    trim: true
  },
  subtitle: {
    type: String,
    trim: true,
    default: null
  },
  registration_link: {
    type: String,
    required: [true, "Registration link is required"],
    trim: true
  },
  year: {
    type: Number,
    required: [true, "Year is required"]
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    default: null
  },
  event_type: {
    type: String,
    trim: true,
    default: null
  },
  abstract_deadline: {
    type: String,
    trim: true,
    default: null
  },
  featured_event: {
    type: Boolean,
    default: false
  },
  location: {
    type: {
      city: {
        type: String,
        required: [true, "City is required"],
        trim: true
      },
      country: {
        type: String,
        required: [true, "Country is required"],
        trim: true
      }
    },
    required: [true, "Location is required"]
  },
  awards: {
    type: [
      {
        icon: { type: String, trim: true, default: null },
        title: { type: String, required: true, trim: true },
        criteria: { type: String, trim: true, default: null }
      }
    ],
    default: []
  },
  registration_fees: {
    type: {
      early_bird_deadline: { type: String, trim: true, default: null },
      categories: {
        type: [
          {
            type: { type: String, trim: true, default: null },
            early_bird: { type: Number, default: null },
            regular: { type: Number, default: null },
            icon: { type: String, trim: true, default: null }
          }
        ],
        default: []
      }
    },
    default: null
  },
  schedule: {
    type: [
      {
        time: { type: String, trim: true, default: null },
        activity: { type: String, trim: true, default: null },
        icon: { type: String, trim: true, default: null }
      }
    ],
    default: []
  },
  venue: {
    type: {
      name: { type: String, trim: true, default: null },
      address: { type: String, trim: true, default: null }
    },
    default: null
  },
  payment_details: {
    type: {
      phoneNumber: { type: String, trim: true, default: null },
      bank_account: {
        type: {
          account: { type: String, trim: true, default: null },
          ifsc: { type: String, trim: true, default: null },
          bank: { type: String, trim: true, default: null },
          branch: { type: String, trim: true, default: null }
        },
        default: null
      }
    },
    default: null
  },
  important_dates: {
    type: [
      {
        label: { type: String, required: true, trim: true },
        date: { type: String, required: true, trim: true }
      }
    ],
    default: []
  },
  guests: {
    type: [
      {
        type: { type: String, trim: true, default: null },
        name: { type: String, trim: true, default: null },
        designation: { type: String, trim: true, default: null },
        organization: { type: String, trim: true, default: null },
        icon: { type: String, trim: true, default: null }
      }
    ],
    default: []
  },
  about: {
    type: {
      description: { type: String, trim: true, default: null },
      tagline: { type: String, trim: true, default: null }
    },
    default: null
  },
  brochure: {
    type: {
      available: { type: Boolean, default: false },
      label: { type: String, trim: true, default: null },
      link: { type: String, trim: true, default: null }
    },
    default: null
  }
}, {
  timestamps: true,
  collection: "events",
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Index for unique constraint
EventSchema.index({ title: 1, year: 1 }, { unique: true });

module.exports = mongoose.model("Event", EventSchema);