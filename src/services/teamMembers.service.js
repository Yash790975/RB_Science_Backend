const statusCode = require("../enums/statusCode");
const CustomError = require("../exceptions/CustomError");
const TeamMembers = require("../models/TeamMembers");
const mongoose = require("mongoose");

const fs = require("fs"); 
const path = require("path");
const { UPLOADS_ROOT } = require("../middlewares/upload"); 

const add = async (req, res) => {
  let uploadedFile;
  try {
    const data = req.body;
    const file = req.file;

    if (!file) {
      throw new CustomError("Team member image is required", statusCode.BAD_REQUEST);
    }

    // Validate that both cannot be true
    if (data.ourExperts && data.ourAdvisory === true) {
      throw new CustomError(
        "A team member cannot be both an Expert and an Advisory member",
        statusCode.BAD_REQUEST
      ); 
    }

    // const existing = await TeamMembers.findOne({ role: data.role });
    // if (existing) {
    //   throw new CustomError(
    //     `Team member with position [${data.role}] already exists`,
    //     statusCode.BAD_REQUEST
    //   );
    // }

    const imageRelativePath = path.join("uploads", "teamMembers", file.filename);
    const imageFullPath = path.join(UPLOADS_ROOT, "teamMembers", file.filename);
    uploadedFile = imageFullPath;

    data.image = imageRelativePath;

    return await TeamMembers.create(data);
  } catch (error) {
    if (uploadedFile && fs.existsSync(uploadedFile)) fs.unlinkSync(uploadedFile);
    console.error("Caught error:", error.message);
    throw error;
  }
};

const update = async (req, res) => {
  const { body, file } = req;
  let uploadedFile;

  if (!mongoose.Types.ObjectId.isValid(body.id)) {
    throw new CustomError("Invalid team member ID format", statusCode.BAD_REQUEST);
  }

  const member = await TeamMembers.findById(body.id);
  if (!member) {
    if (file) {
      const tempPath = path.join(UPLOADS_ROOT, "teamMembers", file.filename);
      if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
    }
    throw new CustomError("Team member not found", statusCode.NOT_FOUND);
  }

  try {
    // Validate that both cannot be true
    const newExperts = body.ourExperts !== undefined ? body.ourExperts : member.ourExperts;
    const newAdvisory = body.ourAdvisory !== undefined ? body.ourAdvisory : member.ourAdvisory;
    
    if (newExperts && newAdvisory) {
      if (file) {
        const tempPath = path.join(UPLOADS_ROOT, "teamMembers", file.filename);
        if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
      }
      throw new CustomError(
        "A team member cannot be both an Expert and an Advisory member",
        statusCode.BAD_REQUEST
      );
    }

    if (body.role && body.role !== member.role) {
      const conflict = await TeamMembers.findOne({ role: body.role });
      if (conflict) {
        if (file) {
          const tempPath = path.join(UPLOADS_ROOT, "teamMembers", file.filename);
          if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
        }
        throw new CustomError(
          `Team member with role [${body.role}] already exists`,
          statusCode.BAD_REQUEST
        );
      }
    }

    // Update fields except id
    Object.keys(body).forEach((key) => {
      if (key !== "id") member[key] = body[key];
    });

    // Handle new image
    if (file) {
      const newImageRelPath = path.join("uploads", "teamMembers", file.filename);
      const newImageFullPath = path.join(UPLOADS_ROOT, "teamMembers", file.filename);
      uploadedFile = newImageFullPath;

      // Delete old image
      if (member.image) {
        const oldImageFullPath = path.join(UPLOADS_ROOT, member.image.replace(/^uploads[\\/]/, ""));
        if (fs.existsSync(oldImageFullPath)) fs.unlinkSync(oldImageFullPath);
      }

      member.image = newImageRelPath;
    }

    return await member.save();
  } catch (error) {
    if (uploadedFile && fs.existsSync(uploadedFile)) fs.unlinkSync(uploadedFile);
    throw error;
  }
};

const remove = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new CustomError("Invalid team member ID format", statusCode.BAD_REQUEST);
  }

  const member = await TeamMembers.findById(id);
  if (!member) {
    throw new CustomError("Team member not found", statusCode.NOT_FOUND);
  }

  if (member.image) {
    const relativePath = member.image.replace(/^uploads[\\/]/, "");
    const imageFullPath = path.resolve(path.join(UPLOADS_ROOT, relativePath));
    console.log("ImageFullPath:", imageFullPath);

    try {
      if (fs.existsSync(imageFullPath)) {
        fs.unlinkSync(imageFullPath);
        console.log("Image deleted successfully");
      } else {
        console.warn("Image file does not exist:", imageFullPath);
      }
    } catch (err) {
      console.error("Failed to delete image:", imageFullPath, err);
    }
  }

  return await TeamMembers.findByIdAndDelete(id);
};

const getById = async (id) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new CustomError("Invalid team member ID format", statusCode.BAD_REQUEST);
    }

    const teamMember = await TeamMembers.findById(id);
    if (!teamMember) {
      throw new CustomError("Team member not found", statusCode.NOT_FOUND);
    }
    return teamMember;
  } catch (error) {
    throw error;
  }
};

const getActive = async () => {
  try {
    const teamMember = await TeamMembers.find({ isActive: true });
    return teamMember;
  } catch (error) {
    throw error;
  }
};

const getAll = async () => {
  try {
    const teamMembers = await TeamMembers.find().sort({ createdAt: -1 });
    return teamMembers;
  } catch (error) {
    throw error;
  }
};

// ✅ New: Get all experts (active and inactive)
const getAllExperts = async () => {
  try {
    const experts = await TeamMembers.find({ ourExperts: true }).sort({ createdAt: -1 });
    return experts;
  } catch (error) {
    throw error;
  }
};

// ✅ New: Get all advisory members (active and inactive)
const getAllAdvisory = async () => {
  try {
    const advisory = await TeamMembers.find({ ourAdvisory: true }).sort({ createdAt: -1 });
    return advisory;
  } catch (error) {
    throw error;
  }
};

// ✅ New: Get active experts only
const getActiveExperts = async () => {
  try {
    const experts = await TeamMembers.find({ 
      ourExperts: true, 
      isActive: true 
    }).sort({ createdAt: -1 });
    return experts;
  } catch (error) {
    throw error;
  }
};

// ✅ New: Get active advisory members only
const getActiveAdvisory = async () => {
  try {
    const advisory = await TeamMembers.find({ 
      ourAdvisory: true, 
      isActive: true 
    }).sort({ createdAt: -1 });
    return advisory;
  } catch (error) {
    throw error;
  }
};

// ✅ New: Get expert by ID
const getExpertById = async (id) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new CustomError("Invalid team member ID format", statusCode.BAD_REQUEST);
    }

    const expert = await TeamMembers.findOne({ _id: id, ourExperts: true });
    if (!expert) {
      throw new CustomError("Expert not found", statusCode.NOT_FOUND);
    }
    return expert;
  } catch (error) {
    throw error;
  }
};

// ✅ New: Get advisory member by ID
const getAdvisoryById = async (id) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new CustomError("Invalid team member ID format", statusCode.BAD_REQUEST);
    }

    const advisory = await TeamMembers.findOne({ _id: id, ourAdvisory: true });
    if (!advisory) {
      throw new CustomError("Advisory member not found", statusCode.NOT_FOUND);
    }
    return advisory;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  add,
  update,
  remove,
  getById,
  getActive,
  getAll,
  getAllExperts,
  getAllAdvisory,
  getActiveExperts,
  getActiveAdvisory,
  getExpertById,
  getAdvisoryById,
};







































































// const statusCode = require("../enums/statusCode");
// const CustomError = require("../exceptions/CustomError");
// const TeamMembers = require("../models/TeamMembers");
// const mongoose = require("mongoose");

// const fs = require("fs"); 
// const path = require("path");
// const { UPLOADS_ROOT } = require("../middlewares/upload");

// const add = async (req, res) => {
//   let uploadedFile;
//   try {
//     const data = req.body;
//     const file = req.file; // single image

//     if (!file) {
//       throw new CustomError("Team member image is required", statusCode.BAD_REQUEST);
//     }

// const existing = await TeamMembers.findOne({ role: data.role });
//     if (existing) {
//       throw new CustomError(
//         `Team member with position [${data.role}] already exists`,
//         statusCode.BAD_REQUEST
//       );
//     }

//     const imageRelativePath = path.join("uploads", "teamMembers", file.filename);
//     const imageFullPath = path.join(UPLOADS_ROOT, "teamMembers", file.filename);
//     uploadedFile = imageFullPath;

//     data.image = imageRelativePath;

//     return await TeamMembers.create(data);
//   } catch (error) {
//     if (uploadedFile && fs.existsSync(uploadedFile)) fs.unlinkSync(uploadedFile);
//     console.error("Caught error:", error.message);
//     throw error;
//   }
// };

// const update = async (req, res) => {
//   const { body, file } = req;
//   let uploadedFile;

//   if (!mongoose.Types.ObjectId.isValid(body.id)) {
//     throw new CustomError("Invalid team member ID format", statusCode.BAD_REQUEST);
//   }

//   const member = await TeamMembers.findById(body.id);
//   if (!member) {
//     if (file) {
//       const tempPath = path.join(UPLOADS_ROOT, "teamMembers", file.filename);
//       if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
//     }
//     throw new CustomError("Team member not found", statusCode.NOT_FOUND);
//   } 

//   try {




//  if (body.role && body.role !== member.role) {
//       const conflict = await TeamMembers.findOne({ role: body.role });
//       if (conflict) {
//         if (file) {
//       const tempPath = path.join(UPLOADS_ROOT, "teamMembers", file.filename);
//       if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
//     }
//         throw new CustomError(
//           `Team member with role [${data.role}]  already exists`,
//           statusCode.BAD_REQUEST
//         );
//       }
//     }




//     // Update fields except id
//     Object.keys(body).forEach((key) => {
//       if (key !== "id") member[key] = body[key];
//     });

//     // Handle new image
//     if (file) {
//       const newImageRelPath = path.join("uploads", "teamMembers", file.filename);
//       const newImageFullPath = path.join(UPLOADS_ROOT, "teamMembers", file.filename);
//       uploadedFile = newImageFullPath;

//       // Delete old image
//       if (member.image) {
//         const oldImageFullPath = path.join(UPLOADS_ROOT, member.image.replace(/^uploads[\\/]/, ""));
//         if (fs.existsSync(oldImageFullPath)) fs.unlinkSync(oldImageFullPath);
//       }

//       member.image = newImageRelPath;
//     }


    

//     return await member.save();
//   } catch (error) {
//     if (uploadedFile && fs.existsSync(uploadedFile)) fs.unlinkSync(uploadedFile);
//     throw error;
//   }
// };

// const remove = async (id) => {
//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     throw new CustomError("Invalid team member ID format", statusCode.BAD_REQUEST);
//   }

//   const member = await TeamMembers.findById(id);
//   if (!member) {
//     throw new CustomError("Team member not found", statusCode.NOT_FOUND);
//   }

// if (member.image) {
//   // Remove leading "uploads/" or "uploads\"
//   const relativePath = member.image.replace(/^uploads[\\/]/, "");
  
//   // Construct absolute normalized path
//   const imageFullPath = path.resolve(path.join(UPLOADS_ROOT, relativePath));
//   console.log("ImageFullPath:", imageFullPath);

//   try {
//     if (fs.existsSync(imageFullPath)) {
//       fs.unlinkSync(imageFullPath);
//       console.log("Image deleted successfully");
//     } else {
//       console.warn("Image file does not exist:", imageFullPath);
//     }
//   } catch (err) {
//     console.error("Failed to delete image:", imageFullPath, err);
//   }
// }



//   return await TeamMembers.findByIdAndDelete(id);
// };






// const getById = async (id) => {
//   try {
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       throw new CustomError("Invalid team member ID format", statusCode.BAD_REQUEST);
//     }

//     const teamMember = await TeamMembers.findById(id);
//     if (!teamMember) {
//       throw new CustomError("Team member not found", statusCode.NOT_FOUND);
//     }
//     return teamMember;
//   } catch (error) {
//     throw error; // rethrow so controller can handle it
//   }
// };

// const getActive = async () => {
//   try {
//     const teamMember = await TeamMembers.find({ isActive: true });
//     return teamMember;
//   } catch (error) {
//     throw error;
//   }
// };

// const getAll = async () => {
//   try {
//     const teamMembers = await TeamMembers.find().sort({ createdAt: -1 });
//     return teamMembers;
//   } catch (error) {
//     throw error;
//   }
// };


// module.exports = {
//   add,
//   update,
//   remove,
//   getById,
//   getActive,
//   getAll,
// };
