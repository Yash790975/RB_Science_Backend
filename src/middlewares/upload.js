// ============================================
// UPDATED upload.js middleware
// ============================================
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Generate unique filename with random 6-digit number
const generateUniqueFilename = (originalName, prefix, index = null) => {
  const randomNum = Math.floor(100000 + Math.random() * 900000); // 6-digit random number
  const ext = path.extname(originalName).toLowerCase();
  const baseName = prefix.toLowerCase().replace(/[^a-z0-9]/g, "-");

  return `${baseName}_${randomNum}${ext}`;
};

// ✅ Custom image filter: only jpg, jpeg, png, webp, gif
const imageFilter = (req, file, cb) => {
  const allowedExt = [".jpg", ".jpeg", ".png", ".webp", ".gif"];
  const ext = path.extname(file.originalname).toLowerCase();

  if (!allowedExt.includes(ext)) {
    return cb(new Error("Only .jpg, .jpeg, .png, .webp, and .gif image formats are allowed!"), false);
  }
  cb(null, true);
};

// ✅ Brochure filter: only PDF, JPG, PNG
const brochureFilter = (req, file, cb) => {
  const allowedExt = [".pdf", ".jpg", ".jpeg", ".png"];
  const ext = path.extname(file.originalname).toLowerCase();

  if (!allowedExt.includes(ext)) {
    return cb(new Error("Only .pdf, .jpg, and .png formats are allowed for brochure!"), false);
  }
  cb(null, true);
};

// ✅ NEW: Certificate filter: images + PDF
const certificateFilter = (req, file, cb) => {
  const allowedExt = [".jpg", ".jpeg", ".png", ".webp", ".gif", ".pdf"];
  const ext = path.extname(file.originalname).toLowerCase();

  if (!allowedExt.includes(ext)) {
    return cb(new Error("Only image and PDF files are allowed for certificates!"), false);
  }
  cb(null, true);
};

// ✅ Create folder if not exists
const ensureDir = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

// -------------------- Dynamic Root Path --------------------
const PROJECT_ROOT = process.cwd();
const UPLOADS_ROOT = path.join(PROJECT_ROOT, "..", "uploads"); // for local
// const UPLOADS_ROOT = path.join(PROJECT_ROOT, "uploads"); // for main server

// ---------------------- Storages ----------------------

// Storage configuration for categories
const ProductCategoriesStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = file.fieldname === "icon"
      ? path.join(UPLOADS_ROOT, "productCategories", "icons")
      : path.join(UPLOADS_ROOT, "productCategories");
    ensureDir(uploadPath);
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const prefix = file.fieldname === "icon"
      ? `${req.body.title || "category"}_icon`
      : req.body.title || "category";
    cb(null, generateUniqueFilename(file.originalname, prefix));
  }
});

// Storage configuration for products
const productStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(UPLOADS_ROOT, "products");
    ensureDir(uploadPath);
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const productName = req.body.name || "product";
    const files = req.files || [];
    const currentIndex = files.indexOf(file);
    cb(null, generateUniqueFilename(file.originalname, productName, currentIndex));
  },
});

// Storage configuration for blog categories
const blogCategoryStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(UPLOADS_ROOT, "blog-categories");
    ensureDir(uploadPath);
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const prefix = req.body.name || "blog-category";
    cb(null, generateUniqueFilename(file.originalname, prefix));
  }
});

// Storage configuration for blogs
const blogStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = file.fieldname === "authorImage"
      ? path.join(UPLOADS_ROOT, "blogs", "authors")
      : path.join(UPLOADS_ROOT, "blogs");
    ensureDir(uploadPath);
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const prefix = file.fieldname === "authorImage"
      ? `${req.body.author || "blogs"}_author`
      : req.body.name || "blogs";
    cb(null, generateUniqueFilename(file.originalname, prefix));
  }
});

// Storage configuration for team members
const teamMemberStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(UPLOADS_ROOT, "teamMembers");
    ensureDir(uploadPath);
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const prefix = req.body.name || "team-member";
    cb(null, generateUniqueFilename(file.originalname, prefix));
  }
});

// Storage configuration for service details
const serviceDetailStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(UPLOADS_ROOT, "servicesDetails");
    ensureDir(uploadPath);
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const prefix = req.body.title || "service-detail";
    cb(null, generateUniqueFilename(file.originalname, prefix));
  }
});

// Storage configuration for events
const eventStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(UPLOADS_ROOT, "events");
    ensureDir(uploadPath);
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const prefix = req.body.title || "event";
    cb(null, generateUniqueFilename(file.originalname, prefix));
  }
});

// Storage configuration for collaborative projects
const collaborativeProjectStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(UPLOADS_ROOT, "collaborativeProjects");
    ensureDir(uploadPath);
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const prefix = req.body.title || "collaborative-project";
    cb(null, generateUniqueFilename(file.originalname, prefix));
  }
});

// Storage configuration for Training Programs
const trainingProgramStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(UPLOADS_ROOT, "trainingPrograms");
    ensureDir(uploadPath);
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const prefix = req.body.title || "training-program";
    cb(null, generateUniqueFilename(file.originalname, prefix));
  }
});

// Storage configuration for Success Stories
const successStoryStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(UPLOADS_ROOT, "successStories");
    ensureDir(uploadPath);
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const prefix = req.body.title || "success-story";
    cb(null, generateUniqueFilename(file.originalname, prefix));
  }
});

// Storage configuration for Facility Details
const facilityDetailStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(UPLOADS_ROOT, "facilityDetails");
    ensureDir(uploadPath);
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const prefix = req.body.title || "facility-detail";
    cb(null, generateUniqueFilename(file.originalname, prefix));
  }
});

// ✅ NEW: Storage configuration for Certificates
const certificateStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(UPLOADS_ROOT, "certificates");
    ensureDir(uploadPath);
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const prefix = req.body.title || "certificate";
    cb(null, generateUniqueFilename(file.originalname, prefix));
  }
});

// ✅ NEW: Storage configuration for News
const newsStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(UPLOADS_ROOT, "news");
    ensureDir(uploadPath);
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const prefix = req.body.title || "news";
    cb(null, generateUniqueFilename(file.originalname, prefix));
  }
});

// ✅ NEW: Storage configuration for Gallery
const galleryStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(UPLOADS_ROOT, "gallery");
    ensureDir(uploadPath);
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const prefix = req.body.title || "gallery";
    cb(null, generateUniqueFilename(file.originalname, prefix));
  }
});

// ---------------------- Uploaders ----------------------

// ✅ Categories: one image + one icon
const uploadProductCategories = multer({
  storage: ProductCategoriesStorage,
  fileFilter: imageFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
}).fields([
  { name: "image", maxCount: 1 },
  { name: "icon", maxCount: 1 },
]);

// ✅ Products: multiple images
const uploadProduct = multer({
  storage: productStorage,
  fileFilter: imageFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
}).array("images", 100);

// ✅ Blog category
const uploadBlogCategory = multer({
  storage: blogCategoryStorage,
  fileFilter: imageFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
}).single("image");

// ✅ Blog
const uploadBlog = multer({
  storage: blogStorage,
  fileFilter: imageFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
}).fields([
  { name: "image", maxCount: 1 },
  { name: "authorImage", maxCount: 1 },
]);

// ✅ Team members
const uploadTeamMember = multer({
  storage: teamMemberStorage,
  fileFilter: imageFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
}).single("image");

// ✅ Service details
const uploadServiceDetail = multer({
  storage: serviceDetailStorage,
  fileFilter: imageFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
}).single("image_url");

// ✅ Events: brochure only (PDF, JPG, PNG)
const uploadEvent = multer({
  storage: eventStorage,
  fileFilter: brochureFilter,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB for brochures
}).fields([
  { name: "brochure", maxCount: 1 }
]);

// ✅ Collaborative Projects
const uploadCollaborativeProject = multer({
  storage: collaborativeProjectStorage,
  fileFilter: imageFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
}).single("image");

// ✅ Training Programs
const uploadTrainingProgram = multer({
  storage: trainingProgramStorage,
  fileFilter: imageFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
}).single("image");

// ✅ Success Stories
const uploadSuccessStory = multer({
  storage: successStoryStorage,
  fileFilter: imageFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
}).single("image");

// ✅ Facility Details
const uploadFacilityDetail = multer({
  storage: facilityDetailStorage,
  fileFilter: imageFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
}).single("image_url");

// ✅ NEW: Certificates (images + PDF)
const uploadCertificate = multer({
  storage: certificateStorage,
  fileFilter: certificateFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
}).single("image_url");

// ✅ NEW: News (images only)
const uploadNews = multer({
  storage: newsStorage,
  fileFilter: imageFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
}).single("image");

// ✅ NEW: Gallery (images only)
const uploadGallery = multer({
  storage: galleryStorage,
  fileFilter: imageFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
}).single("image_url");

// ---------------------- Exports ----------------------

module.exports = {
  uploadProductCategories,
  uploadProduct,
  uploadBlogCategory,
  uploadBlog,
  uploadTeamMember,
  uploadServiceDetail,
  uploadEvent,
  uploadCollaborativeProject,
  uploadTrainingProgram,
  uploadSuccessStory,
  uploadFacilityDetail,
  uploadCertificate,
  uploadNews,
  uploadGallery,
  UPLOADS_ROOT,
};

























































































// // ============================================
// // UPDATED upload.js middleware
// // ============================================
// const multer = require("multer");
// const path = require("path");
// const fs = require("fs");

// // Generate unique filename with random 6-digit number
// const generateUniqueFilename = (originalName, prefix, index = null) => {
//   const randomNum = Math.floor(100000 + Math.random() * 900000); // 6-digit random number
//   const ext = path.extname(originalName).toLowerCase();
//   const baseName = prefix.toLowerCase().replace(/[^a-z0-9]/g, "-");

//   return `${baseName}_${randomNum}${ext}`;
// };

// // ✅ Custom image filter: only jpg, jpeg, png, webp, gif
// const imageFilter = (req, file, cb) => {
//   const allowedExt = [".jpg", ".jpeg", ".png", ".webp", ".gif"];
//   const ext = path.extname(file.originalname).toLowerCase();

//   if (!allowedExt.includes(ext)) {
//     return cb(new Error("Only .jpg, .jpeg, .png, .webp, and .gif image formats are allowed!"), false);
//   }
//   cb(null, true);
// };

// // ✅ Brochure filter: only PDF, JPG, PNG
// const brochureFilter = (req, file, cb) => {
//   const allowedExt = [".pdf", ".jpg", ".jpeg", ".png"];
//   const ext = path.extname(file.originalname).toLowerCase();

//   if (!allowedExt.includes(ext)) {
//     return cb(new Error("Only .pdf, .jpg, and .png formats are allowed for brochure!"), false);
//   }
//   cb(null, true);
// };

// // ✅ Create folder if not exists
// const ensureDir = (dir) => {
//   if (!fs.existsSync(dir)) {
//     fs.mkdirSync(dir, { recursive: true });
//   }
// };

// // -------------------- Dynamic Root Path --------------------
// const PROJECT_ROOT = process.cwd();
// const UPLOADS_ROOT = path.join(PROJECT_ROOT, "..", "uploads"); // for local
// // const UPLOADS_ROOT = path.join(PROJECT_ROOT, "uploads"); // for main server

// // ---------------------- Storages ----------------------

// // Storage configuration for categories
// const ProductCategoriesStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const uploadPath = file.fieldname === "icon"
//       ? path.join(UPLOADS_ROOT, "productCategories", "icons")
//       : path.join(UPLOADS_ROOT, "productCategories");
//     ensureDir(uploadPath);
//     cb(null, uploadPath);
//   },
//   filename: (req, file, cb) => {
//     const prefix = file.fieldname === "icon"
//       ? `${req.body.title || "category"}_icon`
//       : req.body.title || "category";
//     cb(null, generateUniqueFilename(file.originalname, prefix));
//   }
// });

// // Storage configuration for products
// const productStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const uploadPath = path.join(UPLOADS_ROOT, "products");
//     ensureDir(uploadPath);
//     cb(null, uploadPath);
//   },
//   filename: (req, file, cb) => {
//     const productName = req.body.name || "product";
//     const files = req.files || [];
//     const currentIndex = files.indexOf(file);
//     cb(null, generateUniqueFilename(file.originalname, productName, currentIndex));
//   },
// });

// // Storage configuration for blog categories
// const blogCategoryStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const uploadPath = path.join(UPLOADS_ROOT, "blog-categories");
//     ensureDir(uploadPath);
//     cb(null, uploadPath);
//   },
//   filename: (req, file, cb) => {
//     const prefix = req.body.name || "blog-category";
//     cb(null, generateUniqueFilename(file.originalname, prefix));
//   }
// });

// // Storage configuration for blogs
// const blogStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const uploadPath = file.fieldname === "authorImage"
//       ? path.join(UPLOADS_ROOT, "blogs", "authors")
//       : path.join(UPLOADS_ROOT, "blogs");
//     ensureDir(uploadPath);
//     cb(null, uploadPath);
//   },
//   filename: (req, file, cb) => {
//     const prefix = file.fieldname === "authorImage"
//       ? `${req.body.author || "blogs"}_author`
//       : req.body.name || "blogs";
//     cb(null, generateUniqueFilename(file.originalname, prefix));
//   }
// });

// // Storage configuration for team members
// const teamMemberStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const uploadPath = path.join(UPLOADS_ROOT, "teamMembers");
//     ensureDir(uploadPath);
//     cb(null, uploadPath);
//   },
//   filename: (req, file, cb) => {
//     const prefix = req.body.name || "team-member";
//     cb(null, generateUniqueFilename(file.originalname, prefix));
//   }
// });

// // Storage configuration for service details
// const serviceDetailStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const uploadPath = path.join(UPLOADS_ROOT, "servicesDetails");
//     ensureDir(uploadPath);
//     cb(null, uploadPath);
//   },
//   filename: (req, file, cb) => {
//     const prefix = req.body.title || "service-detail";
//     cb(null, generateUniqueFilename(file.originalname, prefix));
//   }
// });

// // Storage configuration for events
// const eventStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const uploadPath = path.join(UPLOADS_ROOT, "events");
//     ensureDir(uploadPath);
//     cb(null, uploadPath);
//   },
//   filename: (req, file, cb) => {
//     const prefix = req.body.title || "event";
//     cb(null, generateUniqueFilename(file.originalname, prefix));
//   }
// });

// // Storage configuration for collaborative projects
// const collaborativeProjectStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const uploadPath = path.join(UPLOADS_ROOT, "collaborativeProjects");
//     ensureDir(uploadPath);
//     cb(null, uploadPath);
//   },
//   filename: (req, file, cb) => {
//     const prefix = req.body.title || "collaborative-project";
//     cb(null, generateUniqueFilename(file.originalname, prefix));
//   }
// });

// // Storage configuration for Training Programs
// const trainingProgramStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const uploadPath = path.join(UPLOADS_ROOT, "trainingPrograms");
//     ensureDir(uploadPath);
//     cb(null, uploadPath);
//   },
//   filename: (req, file, cb) => {
//     const prefix = req.body.title || "training-program";
//     cb(null, generateUniqueFilename(file.originalname, prefix));
//   }
// });

// // Storage configuration for Success Stories
// const successStoryStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const uploadPath = path.join(UPLOADS_ROOT, "successStories");
//     ensureDir(uploadPath);
//     cb(null, uploadPath);
//   },
//   filename: (req, file, cb) => {
//     const prefix = req.body.title || "success-story";
//     cb(null, generateUniqueFilename(file.originalname, prefix));
//   }
// });

// // ✅ NEW: Storage configuration for Facility Details
// const facilityDetailStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const uploadPath = path.join(UPLOADS_ROOT, "facilityDetails");
//     ensureDir(uploadPath);
//     cb(null, uploadPath);
//   },
//   filename: (req, file, cb) => {
//     const prefix = req.body.title || "facility-detail";
//     cb(null, generateUniqueFilename(file.originalname, prefix));
//   }
// });

// // ---------------------- Uploaders ----------------------

// // ✅ Categories: one image + one icon
// const uploadProductCategories = multer({
//   storage: ProductCategoriesStorage,
//   fileFilter: imageFilter,
//   limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
// }).fields([
//   { name: "image", maxCount: 1 },
//   { name: "icon", maxCount: 1 },
// ]);

// // ✅ Products: multiple images
// const uploadProduct = multer({
//   storage: productStorage,
//   fileFilter: imageFilter,
//   limits: { fileSize: 5 * 1024 * 1024 },
// }).array("images", 100);

// // ✅ Blog category
// const uploadBlogCategory = multer({
//   storage: blogCategoryStorage,
//   fileFilter: imageFilter,
//   limits: { fileSize: 5 * 1024 * 1024 },
// }).single("image");

// // ✅ Blog
// const uploadBlog = multer({
//   storage: blogStorage,
//   fileFilter: imageFilter,
//   limits: { fileSize: 5 * 1024 * 1024 },
// }).fields([
//   { name: "image", maxCount: 1 },
//   { name: "authorImage", maxCount: 1 },
// ]);

// // ✅ Team members
// const uploadTeamMember = multer({
//   storage: teamMemberStorage,
//   fileFilter: imageFilter,
//   limits: { fileSize: 5 * 1024 * 1024 },
// }).single("image");

// // ✅ Service details
// const uploadServiceDetail = multer({
//   storage: serviceDetailStorage,
//   fileFilter: imageFilter,
//   limits: { fileSize: 5 * 1024 * 1024 },
// }).single("image_url");

// // ✅ Events: brochure only (PDF, JPG, PNG)
// const uploadEvent = multer({
//   storage: eventStorage,
//   fileFilter: brochureFilter,
//   limits: { fileSize: 10 * 1024 * 1024 }, // 10MB for brochures
// }).fields([
//   { name: "brochure", maxCount: 1 }
// ]);

// // ✅ Collaborative Projects
// const uploadCollaborativeProject = multer({
//   storage: collaborativeProjectStorage,
//   fileFilter: imageFilter,
//   limits: { fileSize: 5 * 1024 * 1024 },
// }).single("image");

// // ✅ Training Programs
// const uploadTrainingProgram = multer({
//   storage: trainingProgramStorage,
//   fileFilter: imageFilter,
//   limits: { fileSize: 5 * 1024 * 1024 },
// }).single("image");

// // ✅ Success Stories
// const uploadSuccessStory = multer({
//   storage: successStoryStorage,
//   fileFilter: imageFilter,
//   limits: { fileSize: 5 * 1024 * 1024 },
// }).single("image");

// // ✅ NEW: Facility Details
// const uploadFacilityDetail = multer({
//   storage: facilityDetailStorage,
//   fileFilter: imageFilter,
//   limits: { fileSize: 5 * 1024 * 1024 },
// }).single("image_url");

// // ---------------------- Exports ----------------------

// module.exports = {
//   uploadProductCategories,
//   uploadProduct,
//   uploadBlogCategory,
//   uploadBlog,
//   uploadTeamMember,
//   uploadServiceDetail,
//   uploadEvent,
//   uploadCollaborativeProject,
//   uploadTrainingProgram,
//   uploadSuccessStory,
//   uploadFacilityDetail,
//   UPLOADS_ROOT,
// };


























































// // ============================================
// // UPDATED upload.js middleware
// // ============================================
// const multer = require("multer");
// const path = require("path");
// const fs = require("fs");

// // Generate unique filename with random 6-digit number
// const generateUniqueFilename = (originalName, prefix, index = null) => {
//   const randomNum = Math.floor(100000 + Math.random() * 900000); // 6-digit random number
//   const ext = path.extname(originalName).toLowerCase();
//   const baseName = prefix.toLowerCase().replace(/[^a-z0-9]/g, "-");

//   return `${baseName}_${randomNum}${ext}`;
// };

// // ✅ Custom image filter: only jpg, jpeg, png, webp, gif
// const imageFilter = (req, file, cb) => {
//   const allowedExt = [".jpg", ".jpeg", ".png", ".webp", ".gif"];
//   const ext = path.extname(file.originalname).toLowerCase();

//   if (!allowedExt.includes(ext)) {
//     return cb(new Error("Only .jpg, .jpeg, .png, .webp, and .gif image formats are allowed!"), false);
//   }
//   cb(null, true);
// };

// // ✅ Brochure filter: only PDF, JPG, PNG
// const brochureFilter = (req, file, cb) => {
//   const allowedExt = [".pdf", ".jpg", ".jpeg", ".png"];
//   const ext = path.extname(file.originalname).toLowerCase();

//   if (!allowedExt.includes(ext)) {
//     return cb(new Error("Only .pdf, .jpg, and .png formats are allowed for brochure!"), false);
//   }
//   cb(null, true);
// };

// // ✅ Create folder if not exists
// const ensureDir = (dir) => {
//   if (!fs.existsSync(dir)) {
//     fs.mkdirSync(dir, { recursive: true });
//   }
// };

// // -------------------- Dynamic Root Path --------------------
// const PROJECT_ROOT = process.cwd();
// const UPLOADS_ROOT = path.join(PROJECT_ROOT, "..", "uploads"); // for local
// // const UPLOADS_ROOT = path.join(PROJECT_ROOT, "uploads"); // for main server

// // ---------------------- Storages ----------------------

// // Storage configuration for categories
// const ProductCategoriesStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const uploadPath = file.fieldname === "icon"
//       ? path.join(UPLOADS_ROOT, "productCategories", "icons")
//       : path.join(UPLOADS_ROOT, "productCategories");
//     ensureDir(uploadPath);
//     cb(null, uploadPath);
//   },
//   filename: (req, file, cb) => {
//     const prefix = file.fieldname === "icon"
//       ? `${req.body.title || "category"}_icon`
//       : req.body.title || "category";
//     cb(null, generateUniqueFilename(file.originalname, prefix));
//   }
// });

// // Storage configuration for products
// const productStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const uploadPath = path.join(UPLOADS_ROOT, "products");
//     ensureDir(uploadPath);
//     cb(null, uploadPath);
//   },
//   filename: (req, file, cb) => {
//     const productName = req.body.name || "product";
//     const files = req.files || [];
//     const currentIndex = files.indexOf(file);
//     cb(null, generateUniqueFilename(file.originalname, productName, currentIndex));
//   },
// });

// // Storage configuration for blog categories
// const blogCategoryStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const uploadPath = path.join(UPLOADS_ROOT, "blog-categories");
//     ensureDir(uploadPath);
//     cb(null, uploadPath);
//   },
//   filename: (req, file, cb) => {
//     const prefix = req.body.name || "blog-category";
//     cb(null, generateUniqueFilename(file.originalname, prefix));
//   }
// });

// // Storage configuration for blogs
// const blogStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const uploadPath = file.fieldname === "authorImage"
//       ? path.join(UPLOADS_ROOT, "blogs", "authors")
//       : path.join(UPLOADS_ROOT, "blogs");
//     ensureDir(uploadPath);
//     cb(null, uploadPath);
//   },
//   filename: (req, file, cb) => {
//     const prefix = file.fieldname === "authorImage"
//       ? `${req.body.author || "blogs"}_author`
//       : req.body.name || "blogs";
//     cb(null, generateUniqueFilename(file.originalname, prefix));
//   }
// });

// // Storage configuration for team members
// const teamMemberStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const uploadPath = path.join(UPLOADS_ROOT, "teamMembers");
//     ensureDir(uploadPath);
//     cb(null, uploadPath);
//   },
//   filename: (req, file, cb) => {
//     const prefix = req.body.name || "team-member";
//     cb(null, generateUniqueFilename(file.originalname, prefix));
//   }
// });

// // Storage configuration for service details
// const serviceDetailStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const uploadPath = path.join(UPLOADS_ROOT, "servicesDetails");
//     ensureDir(uploadPath);
//     cb(null, uploadPath);
//   },
//   filename: (req, file, cb) => {
//     const prefix = req.body.title || "service-detail";
//     cb(null, generateUniqueFilename(file.originalname, prefix));
//   }
// });

// // Storage configuration for events
// const eventStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const uploadPath = path.join(UPLOADS_ROOT, "events");
//     ensureDir(uploadPath);
//     cb(null, uploadPath);
//   },
//   filename: (req, file, cb) => {
//     const prefix = req.body.title || "event";
//     cb(null, generateUniqueFilename(file.originalname, prefix));
//   }
// });

// // Storage configuration for collaborative projects
// const collaborativeProjectStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const uploadPath = path.join(UPLOADS_ROOT, "collaborativeProjects");
//     ensureDir(uploadPath);
//     cb(null, uploadPath);
//   },
//   filename: (req, file, cb) => {
//     const prefix = req.body.title || "collaborative-project";
//     cb(null, generateUniqueFilename(file.originalname, prefix));
//   }
// });

// // ✅ NEW: Storage configuration for Training Programs
// const trainingProgramStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const uploadPath = path.join(UPLOADS_ROOT, "trainingPrograms");
//     ensureDir(uploadPath);
//     cb(null, uploadPath);
//   },
//   filename: (req, file, cb) => {
//     const prefix = req.body.title || "training-program";
//     cb(null, generateUniqueFilename(file.originalname, prefix));
//   }
// });

// // ✅ NEW: Storage configuration for Success Stories
// const successStoryStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const uploadPath = path.join(UPLOADS_ROOT, "successStories");
//     ensureDir(uploadPath);
//     cb(null, uploadPath);
//   },
//   filename: (req, file, cb) => {
//     const prefix = req.body.title || "success-story";
//     cb(null, generateUniqueFilename(file.originalname, prefix));
//   }
// });

// // ---------------------- Uploaders ----------------------

// // ✅ Categories: one image + one icon
// const uploadProductCategories = multer({
//   storage: ProductCategoriesStorage,
//   fileFilter: imageFilter,
//   limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
// }).fields([
//   { name: "image", maxCount: 1 },
//   { name: "icon", maxCount: 1 },
// ]);

// // ✅ Products: multiple images
// const uploadProduct = multer({
//   storage: productStorage,
//   fileFilter: imageFilter,
//   limits: { fileSize: 5 * 1024 * 1024 },
// }).array("images", 100);

// // ✅ Blog category
// const uploadBlogCategory = multer({
//   storage: blogCategoryStorage,
//   fileFilter: imageFilter,
//   limits: { fileSize: 5 * 1024 * 1024 },
// }).single("image");

// // ✅ Blog
// const uploadBlog = multer({
//   storage: blogStorage,
//   fileFilter: imageFilter,
//   limits: { fileSize: 5 * 1024 * 1024 },
// }).fields([
//   { name: "image", maxCount: 1 },
//   { name: "authorImage", maxCount: 1 },
// ]);

// // ✅ Team members
// const uploadTeamMember = multer({
//   storage: teamMemberStorage,
//   fileFilter: imageFilter,
//   limits: { fileSize: 5 * 1024 * 1024 },
// }).single("image");

// // ✅ Service details
// const uploadServiceDetail = multer({
//   storage: serviceDetailStorage,
//   fileFilter: imageFilter,
//   limits: { fileSize: 5 * 1024 * 1024 },
// }).single("image_url");

// // ✅ Events: brochure only (PDF, JPG, PNG)
// const uploadEvent = multer({
//   storage: eventStorage,
//   fileFilter: brochureFilter,
//   limits: { fileSize: 10 * 1024 * 1024 }, // 10MB for brochures
// }).fields([
//   { name: "brochure", maxCount: 1 }
// ]);

// // ✅ Collaborative Projects
// const uploadCollaborativeProject = multer({
//   storage: collaborativeProjectStorage,
//   fileFilter: imageFilter,
//   limits: { fileSize: 5 * 1024 * 1024 },
// }).single("image");

// // ✅ NEW: Training Programs
// const uploadTrainingProgram = multer({
//   storage: trainingProgramStorage,
//   fileFilter: imageFilter,
//   limits: { fileSize: 5 * 1024 * 1024 },
// }).single("image");

// // ✅ NEW: Success Stories
// const uploadSuccessStory = multer({
//   storage: successStoryStorage,
//   fileFilter: imageFilter,
//   limits: { fileSize: 5 * 1024 * 1024 },
// }).single("image");

// // ---------------------- Exports ----------------------

// module.exports = {
//   uploadProductCategories,
//   uploadProduct,
//   uploadBlogCategory,
//   uploadBlog,
//   uploadTeamMember,
//   uploadServiceDetail,
//   uploadEvent,
//   uploadCollaborativeProject,
//   uploadTrainingProgram,
//   uploadSuccessStory,
//   UPLOADS_ROOT,
// };

