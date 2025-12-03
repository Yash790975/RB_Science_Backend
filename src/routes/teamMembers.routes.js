const express = require("express");
const validate = require("../middlewares/validation.middleware");
const {
  addTeamMember,
  updateTeamMember,
  getTeamMemberById,
  deleteTeamMember,
} = require("../validations/teamMembers.validations");
const teamMembersController = require("../controllers/teamMembers.controllers");
const { uploadTeamMember } = require("../middlewares/upload");
const router = express.Router();
 
// Existing routes
router.post("/add", uploadTeamMember, validate(addTeamMember), teamMembersController.add);
router.post("/update", uploadTeamMember, validate(updateTeamMember), teamMembersController.update);
router.get("/getById/:id", validate(getTeamMemberById), teamMembersController.getById);
router.get("/getAll", teamMembersController.getAll);
router.get("/getActive", teamMembersController.getActive);
router.delete("/:id", validate(deleteTeamMember), teamMembersController.remove);

// ✅ New routes for experts
router.get("/experts/all", teamMembersController.getAllExperts);
router.get("/experts/active", teamMembersController.getActiveExperts);
router.get("/experts/:id", validate(getTeamMemberById), teamMembersController.getExpertById);

// ✅ New routes for advisory
router.get("/advisory/all", teamMembersController.getAllAdvisory);
router.get("/advisory/active", teamMembersController.getActiveAdvisory);
router.get("/advisory/:id", validate(getTeamMemberById), teamMembersController.getAdvisoryById);

module.exports = router;





























































// const express = require("express");
// const validate = require("../middlewares/validation.middleware");
// const {
//   addTeamMember,
//   updateTeamMember,
//   getTeamMemberById,
//   deleteTeamMember,
// } = require("../validations/teamMembers.validations");
// const teamMembersController = require("../controllers/teamMembers.controllers");
// const {uploadTeamMember}=require("../middlewares/upload");
// const router = express.Router();

// router.post("/add",uploadTeamMember, validate(addTeamMember), teamMembersController.add);

// router.post("/update",uploadTeamMember, validate(updateTeamMember), teamMembersController.update);

// router.get("/getById/:id", validate(getTeamMemberById), teamMembersController.getById);

// router.get("/getAll", teamMembersController.getAll);
// router.get("/getActive",teamMembersController.getActive);

// router.delete("/:id", validate(deleteTeamMember), teamMembersController.remove);

// module.exports = router;
