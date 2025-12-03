const teamMembersService = require("../services/teamMembers.service");
const apiResponse = require("../utils/apiResponse");
const statusCode = require("../enums/statusCode");

exports.add = async (req, res) => {
  try {
    const result = await teamMembersService.add(req, res);
    res.status(statusCode.CREATED).json(
      apiResponse({   
        success: true,
        isException: false,   
        statusCode: statusCode.CREATED,
        message: "Team member added successfully",
        result,
      })
    );
  } catch (err) {
    console.error("Add TeamMember Error:", err);
    res.status(err.statusCode || statusCode.INTERNAL_SERVER_ERROR).json(
      apiResponse({
        success: false,
        isException: true,
        statusCode: err.statusCode || statusCode.INTERNAL_SERVER_ERROR,
        message: err.message || "Failed to add team member",
        result: null,
      })
    );
  }
};

exports.update = async (req, res) => {
  try {
    const result = await teamMembersService.update(req, res);
    res.status(statusCode.OK).json(
      apiResponse({
        success: true,
        isException: false,
        statusCode: statusCode.OK,
        message: "Team member updated successfully",
        result,
      })
    );
  } catch (err) {
    console.error("Update TeamMember Error:", err);
    res.status(err.statusCode || statusCode.INTERNAL_SERVER_ERROR).json(
      apiResponse({
        success: false,
        isException: true,
        statusCode: err.statusCode || statusCode.INTERNAL_SERVER_ERROR,
        message: err.message || "Failed to update team member",
        result: null,
      })
    );
  }
};

exports.getById = async (req, res) => {
  try {
    const result = await teamMembersService.getById(req.params.id);
    res.status(statusCode.OK).json(
      apiResponse({
        success: true,
        isException: false,
        statusCode: statusCode.OK,
        message: "Team member retrieved successfully",
        result,
      })
    );
  } catch (err) {
    console.error("GetById TeamMember Error:", err);
    res.status(err.statusCode || statusCode.INTERNAL_SERVER_ERROR).json(
      apiResponse({
        success: false,
        isException: true,
        statusCode: err.statusCode || statusCode.INTERNAL_SERVER_ERROR,
        message: err.message || "Failed to fetch team member",
        result: null,
      })
    );
  }
};

exports.getAll = async (req, res) => {
  try {
    const result = await teamMembersService.getAll();
    res.status(statusCode.OK).json(
      apiResponse({
        success: true,
        isException: false,
        statusCode: statusCode.OK,
        message: "Team members retrieved successfully",
        result,
      })
    );
  } catch (err) {
    console.error("GetAll TeamMembers Error:", err);
    res.status(err.statusCode || statusCode.INTERNAL_SERVER_ERROR).json(
      apiResponse({
        success: false,
        isException: true,
        statusCode: err.statusCode || statusCode.INTERNAL_SERVER_ERROR,
        message: err.message || "Failed to fetch team members",
        result: null,
      })
    );
  }
};

exports.remove = async (req, res) => {
  try {
    const result = await teamMembersService.remove(req.params.id);
    res.status(statusCode.OK).json(
      apiResponse({
        success: true,
        isException: false,
        statusCode: statusCode.OK,
        message: "Team member deleted successfully",
        result,
      })
    );
  } catch (err) {
    console.error("Remove TeamMember Error:", err);
    res.status(err.statusCode || statusCode.INTERNAL_SERVER_ERROR).json(
      apiResponse({
        success: false,
        isException: true,
        statusCode: err.statusCode || statusCode.INTERNAL_SERVER_ERROR,
        message: err.message || "Failed to delete team member",
        result: null,
      })
    );
  }
};

exports.getActive = async (req, res) => {
  try {
    const result = await teamMembersService.getActive();
    res.status(statusCode.OK).json(
      apiResponse({
        success: true,
        isException: false,
        statusCode: statusCode.OK,
        message: "Active team members retrieved successfully",
        result,
      })
    );
  } catch (err) {
    console.error("GetActive TeamMember Error:", err);
    res.status(err.statusCode || statusCode.INTERNAL_SERVER_ERROR).json(
      apiResponse({
        success: false,
        isException: true,
        statusCode: err.statusCode || statusCode.INTERNAL_SERVER_ERROR,
        message: err.message || "Failed to fetch active team members",
        result: null,
      })
    );
  }
};

// ✅ New: Get all experts
exports.getAllExperts = async (req, res) => {
  try {
    const result = await teamMembersService.getAllExperts();
    res.status(statusCode.OK).json(
      apiResponse({
        success: true,
        isException: false,
        statusCode: statusCode.OK,
        message: "All experts retrieved successfully",
        result,
      })
    );
  } catch (err) {
    console.error("GetAllExperts Error:", err);
    res.status(err.statusCode || statusCode.INTERNAL_SERVER_ERROR).json(
      apiResponse({
        success: false,
        isException: true,
        statusCode: err.statusCode || statusCode.INTERNAL_SERVER_ERROR,
        message: err.message || "Failed to fetch experts",
        result: null,
      })
    );
  }
};

// ✅ New: Get all advisory members
exports.getAllAdvisory = async (req, res) => {
  try {
    const result = await teamMembersService.getAllAdvisory();
    res.status(statusCode.OK).json(
      apiResponse({
        success: true,
        isException: false,
        statusCode: statusCode.OK,
        message: "All advisory members retrieved successfully",
        result,
      })
    );
  } catch (err) {
    console.error("GetAllAdvisory Error:", err);
    res.status(err.statusCode || statusCode.INTERNAL_SERVER_ERROR).json(
      apiResponse({
        success: false,
        isException: true,
        statusCode: err.statusCode || statusCode.INTERNAL_SERVER_ERROR,
        message: err.message || "Failed to fetch advisory members",
        result: null,
      })
    );
  }
};

// ✅ New: Get active experts only
exports.getActiveExperts = async (req, res) => {
  try {
    const result = await teamMembersService.getActiveExperts();
    res.status(statusCode.OK).json(
      apiResponse({
        success: true,
        isException: false,
        statusCode: statusCode.OK,
        message: "Active experts retrieved successfully",
        result,
      })
    );
  } catch (err) {
    console.error("GetActiveExperts Error:", err);
    res.status(err.statusCode || statusCode.INTERNAL_SERVER_ERROR).json(
      apiResponse({
        success: false,
        isException: true,
        statusCode: err.statusCode || statusCode.INTERNAL_SERVER_ERROR,
        message: err.message || "Failed to fetch active experts",
        result: null,
      })
    );
  }
};

// ✅ New: Get active advisory members only
exports.getActiveAdvisory = async (req, res) => {
  try {
    const result = await teamMembersService.getActiveAdvisory();
    res.status(statusCode.OK).json(
      apiResponse({
        success: true,
        isException: false,
        statusCode: statusCode.OK,
        message: "Active advisory members retrieved successfully",
        result,
      })
    );
  } catch (err) {
    console.error("GetActiveAdvisory Error:", err);
    res.status(err.statusCode || statusCode.INTERNAL_SERVER_ERROR).json(
      apiResponse({
        success: false,
        isException: true,
        statusCode: err.statusCode || statusCode.INTERNAL_SERVER_ERROR,
        message: err.message || "Failed to fetch active advisory members",
        result: null,
      })
    );
  }
};

// ✅ New: Get expert by ID
exports.getExpertById = async (req, res) => {
  try {
    const result = await teamMembersService.getExpertById(req.params.id);
    res.status(statusCode.OK).json(
      apiResponse({
        success: true,
        isException: false,
        statusCode: statusCode.OK,
        message: "Expert retrieved successfully",
        result,
      })
    );
  } catch (err) {
    console.error("GetExpertById Error:", err);
    res.status(err.statusCode || statusCode.INTERNAL_SERVER_ERROR).json(
      apiResponse({
        success: false,
        isException: true,
        statusCode: err.statusCode || statusCode.INTERNAL_SERVER_ERROR,
        message: err.message || "Failed to fetch expert",
        result: null,
      })
    );
  }
};

// ✅ New: Get advisory member by ID
exports.getAdvisoryById = async (req, res) => {
  try {
    const result = await teamMembersService.getAdvisoryById(req.params.id);
    res.status(statusCode.OK).json(
      apiResponse({
        success: true,
        isException: false,
        statusCode: statusCode.OK,
        message: "Advisory member retrieved successfully",
        result,
      })
    );
  } catch (err) {
    console.error("GetAdvisoryById Error:", err);
    res.status(err.statusCode || statusCode.INTERNAL_SERVER_ERROR).json(
      apiResponse({
        success: false,
        isException: true,
        statusCode: err.statusCode || statusCode.INTERNAL_SERVER_ERROR,
        message: err.message || "Failed to fetch advisory member",
        result: null,
      })
    );
  }
};

































































// const teamMembersService = require("../services/teamMembers.service");
// const apiResponse = require("../utils/apiResponse");
// const statusCode = require("../enums/statusCode");

// exports.add = async (req, res) => {
//   try {
//     const result = await teamMembersService.add(req, res);
//     res.status(statusCode.CREATED).json(
//       apiResponse({
//         success: true,
//         isException: false,   
//         statusCode: statusCode.CREATED,
//         message: "Team member added successfully",
//         result,
//       })
//     );
//   } catch (err) {
//     console.error("Add TeamMember Error:", err);
//     res.status(err.statusCode || statusCode.INTERNAL_SERVER_ERROR).json(
//       apiResponse({
//         success: false,
//         isException: true,
//         statusCode: err.statusCode || statusCode.INTERNAL_SERVER_ERROR,
//         message: err.message || "Failed to add team member",
//         result: null,
//       })
//     );
//   }
// };

// exports.update = async (req, res) => {
//   try {
//     const result = await teamMembersService.update(req, res);
//     res.status(statusCode.OK).json(
//       apiResponse({
//         success: true,
//         isException: false,
//         statusCode: statusCode.OK,
//         message: "Team member updated successfully",
//         result,
//       })
//     );
//   } catch (err) {
//     console.error("Update TeamMember Error:", err);
//     res.status(err.statusCode || statusCode.INTERNAL_SERVER_ERROR).json(
//       apiResponse({
//         success: false,
//         isException: true,
//         statusCode: err.statusCode || statusCode.INTERNAL_SERVER_ERROR,
//         message: err.message || "Failed to update team member",
//         result: null,
//       })
//     );
//   }
// };

// exports.getById = async (req, res) => {
//   try {
//     const result = await teamMembersService.getById(req.params.id);
//     res.status(statusCode.OK).json(
//       apiResponse({
//         success: true,
//         isException: false,
//         statusCode: statusCode.OK,
//         message: "Team member retrieved successfully",
//         result,
//       })
//     );
//   } catch (err) {
//     console.error("GetById TeamMember Error:", err);
//     res.status(err.statusCode || statusCode.INTERNAL_SERVER_ERROR).json(
//       apiResponse({
//         success: false,
//         isException: true,
//         statusCode: err.statusCode || statusCode.INTERNAL_SERVER_ERROR,
//         message: err.message || "Failed to fetch team member",
//         result: null,
//       })
//     );
//   }
// };

// exports.getAll = async (req, res) => {
//   try {
//     const result = await teamMembersService.getAll();
//     res.status(statusCode.OK).json(
//       apiResponse({
//         success: true,
//         isException: false,
//         statusCode: statusCode.OK,
//         message: "Team members retrieved successfully",
//         result,
//       })
//     );
//   } catch (err) {
//     console.error("GetAll TeamMembers Error:", err);
//     res.status(err.statusCode || statusCode.INTERNAL_SERVER_ERROR).json(
//       apiResponse({
//         success: false,
//         isException: true,
//         statusCode: err.statusCode || statusCode.INTERNAL_SERVER_ERROR,
//         message: err.message || "Failed to fetch team members",
//         result: null,
//       })
//     );
//   }
// };

// exports.remove = async (req, res) => {
//   try {
//     const result = await teamMembersService.remove(req.params.id);
//     res.status(statusCode.OK).json(
//       apiResponse({
//         success: true,
//         isException: false,
//         statusCode: statusCode.OK,
//         message: "Team member deleted successfully",
//         result,
//       })
//     );
//   } catch (err) {
//     console.error("Remove TeamMember Error:", err);
//     res.status(err.statusCode || statusCode.INTERNAL_SERVER_ERROR).json(
//       apiResponse({
//         success: false,
//         isException: true,
//         statusCode: err.statusCode || statusCode.INTERNAL_SERVER_ERROR,
//         message: err.message || "Failed to delete team member",
//         result: null,
//       })
//     );
//   }
// };

// exports.getActive = async (req, res) => {
//   try {
//     const result = await teamMembersService.getActive();
//     res.status(statusCode.OK).json(
//       apiResponse({
//         success: true,
//         isException: false,
//         statusCode: statusCode.OK,
//         message: "Active team member retrieved successfully",
//         result,
//       })
//     );
//   } catch (err) {
//     console.error("GetActive TeamMember Error:", err);
//     res.status(err.statusCode || statusCode.INTERNAL_SERVER_ERROR).json(
//       apiResponse({
//         success: false,
//         isException: true,
//         statusCode: err.statusCode || statusCode.INTERNAL_SERVER_ERROR,
//         message: err.message || "Failed to fetch active team member",
//         result: null,
//       })
//     );
//   }
// };
