const mongoose = require("mongoose");
 
const TeamMembersSchema = new mongoose.Schema(
  {
    name: { 
      type: String,
      required: [true, "Team member name is required"],
      trim: true, 
    },  
    role: { 
      type: String,
      required: [true, "Team member role is required"],
      trim: true,
    },
    image: {
      type: String,
      required: [true, "Team member image is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Team member description is required"],
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    ourExperts: {
      type: Boolean,
      default: false,
    },
    ourAdvisory: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    collection: "team_members",
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
); 

// ✅ Index for role
TeamMembersSchema.index({ role: 1 }, { unique: true });

// ✅ Indexes for new fields
TeamMembersSchema.index({ ourExperts: 1 });
TeamMembersSchema.index({ ourAdvisory: 1 });

// ✅ Pre-save hook to ensure only one can be true
TeamMembersSchema.pre("save", function (next) {
  if (this.ourExperts && this.ourAdvisory) {
    return next(new Error("A team member cannot be both an Expert and an Advisory member"));
  }
  next();
});

module.exports = mongoose.model("TeamMembers", TeamMembersSchema);