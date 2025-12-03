
// ============================================
// collaborativeProjects.routes.js
// ============================================
const express = require("express");
const validate = require("../middlewares/validation.middleware");
const {
  addCollaborativeProject,
  updateCollaborativeProject,
  getCollaborativeProjectById,
  deleteCollaborativeProject,
} = require("../validations/collaborativeProjects.validations");
const collaborativeProjectsController = require("../controllers/collaborativeProjects.controllers");
const { uploadCollaborativeProject } = require("../middlewares/upload");
const router = express.Router();

// CRUD routes
router.post("/add", uploadCollaborativeProject, validate(addCollaborativeProject), collaborativeProjectsController.add);
router.post("/update", uploadCollaborativeProject, validate(updateCollaborativeProject), collaborativeProjectsController.update);
router.get("/getById/:id", validate(getCollaborativeProjectById), collaborativeProjectsController.getById);
router.get("/getAll", collaborativeProjectsController.getAll);
router.get("/getActive", collaborativeProjectsController.getActive);
router.delete("/:id", validate(deleteCollaborativeProject), collaborativeProjectsController.remove);

// Additional route for filtering by university
router.get("/university/:university", collaborativeProjectsController.getByUniversity);

module.exports = router;
 
// ============================================
// 6. UPDATE upload.js middleware (ADD THIS)
// ============================================
/*
Add this to your existing upload.js middleware file:

const uploadCollaborativeProject = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadPath = path.join(UPLOADS_ROOT, "collaborativeProjects");
      if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });
      }
      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, uniqueSuffix + path.extname(file.originalname));
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error("Only image files are allowed!"));
  },
}).single("image");

// Export it
module.exports = {
  ...existing exports,
  uploadCollaborativeProject,
};
*/