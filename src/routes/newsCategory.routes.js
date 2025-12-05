
// ============================================
// newsCategory.routes.js
// ============================================

const express2 = require("express");
const validate2 = require("../middlewares/validation.middleware");
const {
  addNewsCategory,
  updateNewsCategory,
  getNewsCategoryById,
  deleteNewsCategory,
} = require("../validations/newsCategory.validations");
const  newsCategoryController  = require("../controllers/newsCategory.controllers");
const router2 = express2.Router();

router2.post("/add", validate2(addNewsCategory), newsCategoryController.add);
router2.post("/update", validate2(updateNewsCategory), newsCategoryController.update);
router2.get("/getById/:id", validate2(getNewsCategoryById), newsCategoryController.getById);
router2.get("/getAll", newsCategoryController.getAll);
router2.get("/getActive", newsCategoryController.getActive);
router2.delete("/:id", validate2(deleteNewsCategory), newsCategoryController.remove);

module.exports = router2;