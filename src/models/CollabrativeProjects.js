const mongoose = require('mongoose');

// Define the schema for collaborative projects
const collaborativeProjectsSchema = new mongoose.Schema({
  image: {
    type: String,
    required: [true, 'Image URL is required'],
    trim: true
  },
  title: {
    type: String,
    required: [true, 'Title is required'],
    unique: true,
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  university: {
    type: String,
    required: [true, 'University name is required'],
    trim: true
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true // Adds createdAt and updatedAt fields automatically
});

// Add indexes for better query performance
collaborativeProjectsSchema.index({ university: 1 });
collaborativeProjectsSchema.index({ isActive: 1 });
collaborativeProjectsSchema.index({ title: 'text', description: 'text' });

// Create and export the model
const CollaborativeProjects = mongoose.model('CollaborativeProjects', collaborativeProjectsSchema);

module.exports = CollaborativeProjects;
