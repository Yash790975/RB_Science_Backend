
// ============================================
// news.routes.js 
// ===================== =======================

const express3 = require("express");
const validate3 = require("../middlewares/validation.middleware");
const {
  addNews,
  updateNews,
  getNewsById,
  deleteNews,
  getNewsByCategoryId,
} = require("../validations/news.validations");
const  newsController  = require("../controllers/news.controllers");
const { uploadNews } = require("../middlewares/upload");
const router3 = express3.Router();


router3.post("/add", uploadNews, validate3(addNews), newsController.add);
router3.post("/update", uploadNews, validate3(updateNews), newsController.update);
router3.get("/getById/:id", validate3(getNewsById), newsController.getById);
router3.get("/getAll", newsController.getAll);
router3.get("/getActive", newsController.getActive);
router3.delete("/:id", validate3(deleteNews), newsController.remove);

// Get news by category
router3.get("/category/:categoryId", validate3(getNewsByCategoryId), newsController.getNewsByCategoryId);
router3.get("/category/:categoryId/active", validate3(getNewsByCategoryId), newsController.getActiveNewsByCategoryId);

module.exports = router3;
