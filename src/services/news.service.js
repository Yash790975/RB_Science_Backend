const statusCode = require("../enums/statusCode");
const CustomError = require("../exceptions/CustomError");
const News = require("../models/News");
const NewsCategory = require("../models/NewsCategory");
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const { UPLOADS_ROOT } = require("../middlewares/upload");

// const newsService = { 
  const add = async (req, res) => {
    let uploadedFile;
    try { 
      const data = req.body;
      const file = req.file;

      // Verify category exists
      const categoryExists = await NewsCategory.findById(data.categoryId);
      if (!categoryExists) {
        if (file) {
          const tempPath = path.join(UPLOADS_ROOT, "news", file.filename);
          if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
        }
        throw new CustomError("News category not found", statusCode.NOT_FOUND);
      }

      // Check for duplicate name under same category
      const existing = await News.findOne({
        name: data.name,
        categoryId: data.categoryId,
      });
      if (existing) {
        if (file) {
          const tempPath = path.join(UPLOADS_ROOT, "news", file.filename);
          if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
        }
        throw new CustomError(
          `News with name [${data.name}] already exists in this category`,
          statusCode.BAD_REQUEST
        );
      }

      // Parse content array if it's a string
      if (data.content && typeof data.content === "string") {
        try {
          data.content = JSON.parse(data.content);
        } catch (e) {
          if (file) {
            const tempPath = path.join(UPLOADS_ROOT, "news", file.filename);
            if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
          }
          throw new CustomError("Invalid content format", statusCode.BAD_REQUEST);
        }
      }

      // Handle image upload
      if (file) {
        const imageRelativePath = path.join("uploads", "news", file.filename);
        const imageFullPath = path.join(UPLOADS_ROOT, "news", file.filename);
        uploadedFile = imageFullPath;
        data.image = imageRelativePath;
      }

      return await News.create(data);
    } catch (error) {
      if (uploadedFile && fs.existsSync(uploadedFile)) fs.unlinkSync(uploadedFile);
      throw error;
    }
  }; 

  const update = async (req, res) => {
    const { body, file } = req;
    let uploadedFile;

    if (!mongoose.Types.ObjectId.isValid(body.id)) {
      throw new CustomError("Invalid news ID format", statusCode.BAD_REQUEST);
    }

    const news = await News.findById(body.id);
    if (!news) {
      if (file) {
        const tempPath = path.join(UPLOADS_ROOT, "news", file.filename);
        if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
      }
      throw new CustomError("News not found", statusCode.NOT_FOUND);
    }

    try {
      // If category is being changed, verify new category exists
      if (body.categoryId && body.categoryId !== news.categoryId.toString()) {
        const categoryExists = await NewsCategory.findById(body.categoryId);
        if (!categoryExists) {
          if (file) {
            const tempPath = path.join(UPLOADS_ROOT, "news", file.filename);
            if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
          }
          throw new CustomError("News category not found", statusCode.NOT_FOUND);
        }
      }

      // Check for duplicate name
      const targetCategoryId = body.categoryId || news.categoryId;
      const targetName = body.name || news.name;

      if (body.name || body.categoryId) {
        const conflict = await News.findOne({
          _id: { $ne: body.id },
          name: targetName,
          categoryId: targetCategoryId,
        });
        if (conflict) {
          if (file) {
            const tempPath = path.join(UPLOADS_ROOT, "news", file.filename);
            if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
          }
          throw new CustomError(
            `News with name [${targetName}] already exists in this category`,
            statusCode.BAD_REQUEST
          );
        }
      }

      // Parse content array if it's a string
      if (body.content && typeof body.content === "string") {
        try {
          body.content = JSON.parse(body.content);
        } catch (e) {
          if (file) {
            const tempPath = path.join(UPLOADS_ROOT, "news", file.filename);
            if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
          }
          throw new CustomError("Invalid content format", statusCode.BAD_REQUEST);
        }
      }

      // Update fields except id
      Object.keys(body).forEach((key) => {
        if (key !== "id") news[key] = body[key];
      });

      // Handle new image
      if (file) {
        const newImageRelPath = path.join("uploads", "news", file.filename);
        const newImageFullPath = path.join(UPLOADS_ROOT, "news", file.filename);
        uploadedFile = newImageFullPath;

        // Delete old image
        if (news.image) {
          const oldImageFullPath = path.join(UPLOADS_ROOT, news.image.replace(/^uploads[\\/]/, ""));
          if (fs.existsSync(oldImageFullPath)) fs.unlinkSync(oldImageFullPath);
        }

        news.image = newImageRelPath;
      }

      return await news.save();
    } catch (error) {
      if (uploadedFile && fs.existsSync(uploadedFile)) fs.unlinkSync(uploadedFile);
      throw error;
    }
  };

  const remove = async (id) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new CustomError("Invalid news ID format", statusCode.BAD_REQUEST);
    }

    const news = await News.findById(id);
    if (!news) {
      throw new CustomError("News not found", statusCode.NOT_FOUND);
    }

    if (news.image) {
      const relativePath = news.image.replace(/^uploads[\\/]/, "");
      const imageFullPath = path.resolve(path.join(UPLOADS_ROOT, relativePath));

      try {
        if (fs.existsSync(imageFullPath)) {
          fs.unlinkSync(imageFullPath);
          console.log("Image deleted successfully");
        }
      } catch (err) {
        console.error("Failed to delete image:", imageFullPath, err);
      }
    }

    return await News.findByIdAndDelete(id);
  };

  const getById = async (id) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new CustomError("Invalid news ID format", statusCode.BAD_REQUEST);
    }

    const news = await News.findById(id).populate("categoryId");
    if (!news) {
      throw new CustomError("News not found", statusCode.NOT_FOUND);
    }
    return news;
  };

  const getActive = async () => {
    const news = await News.find({ isActive: true })
      .populate("categoryId")
      .sort({ createdAt: -1 });
    return news;
  };

  const getAll = async () => {
    const news = await News.find()
      .populate("categoryId")
      .sort({ createdAt: -1 });
    return news;
  };

  const getNewsByCategoryId = async (categoryId) => {
    if (!mongoose.Types.ObjectId.isValid(categoryId)) {
      throw new CustomError("Invalid category ID format", statusCode.BAD_REQUEST);
    }

    const news = await News.find({ categoryId })
      .populate("categoryId")
      .sort({ createdAt: -1 });
    return news;
  };

  const getActiveNewsByCategoryId = async (categoryId) => {
    if (!mongoose.Types.ObjectId.isValid(categoryId)) {
      throw new CustomError("Invalid category ID format", statusCode.BAD_REQUEST);
    }

    const news = await News.find({ categoryId, isActive: true })
      .populate("categoryId")
      .sort({ createdAt: -1 });
    return news;
  }; 
// };

module.exports = {
  add,
  update,
  remove,
  getById,
  getActive,
  getAll,
  getNewsByCategoryId,
  getActiveNewsByCategoryId
}




























































// // ============================================
// // news.service.js
// // ============================================


// const statusCode = require("../enums/statusCode");
// const CustomError = require("../exceptions/CustomError");
// const News = require("../models/News");
// const NewsCategory = require("../models/NewsCategory");
// const mongoose = require("mongoose");
// const fs = require("fs");
// const path = require("path");
// const { UPLOADS_ROOT } = require("../middlewares/upload");

// const newsService = {
//   add: async (req, res) => {
//     let uploadedFile;
//     try {
//       const data = req.body;
//       const file = req.file;

//       // Verify category exists
//       const categoryExists = await NewsCategory.findById(data.categoryId);
//       if (!categoryExists) {
//         if (file) {
//           const tempPath = path.join(UPLOADS_ROOT, "news", file.filename);
//           if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
//         }
//         throw new CustomError("News category not found", statusCode.NOT_FOUND);
//       }

//       // Check for duplicate name under same category
//       const existing = await News.findOne({
//         name: data.name,
//         categoryId: data.categoryId,
//       });
//       if (existing) {
//         if (file) {
//           const tempPath = path.join(UPLOADS_ROOT, "news", file.filename);
//           if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
//         }
//         throw new CustomError(
//           `News with name [${data.name}] already exists in this category`,
//           statusCode.BAD_REQUEST
//         );
//       }

//       // Parse content array if it's a string
//       if (data.content && typeof data.content === "string") {
//         try {
//           data.content = JSON.parse(data.content);
//         } catch (e) {
//           if (file) {
//             const tempPath = path.join(UPLOADS_ROOT, "news", file.filename);
//             if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
//           }
//           throw new CustomError("Invalid content format", statusCode.BAD_REQUEST);
//         }
//       }

//       // Handle image upload
//       if (file) {
//         const imageRelativePath = path.join("uploads", "news", file.filename);
//         const imageFullPath = path.join(UPLOADS_ROOT, "news", file.filename);
//         uploadedFile = imageFullPath;
//         data.image = imageRelativePath;
//       }

//       return await News.create(data);
//     } catch (error) {
//       if (uploadedFile && fs.existsSync(uploadedFile)) fs.unlinkSync(uploadedFile);
//       throw error;
//     }
//   },

//   update: async (req, res) => {
//     const { body, file } = req;
//     let uploadedFile;

//     if (!mongoose.Types.ObjectId.isValid(body.id)) {
//       throw new CustomError("Invalid news ID format", statusCode.BAD_REQUEST);
//     }

//     const news = await News.findById(body.id);
//     if (!news) {
//       if (file) {
//         const tempPath = path.join(UPLOADS_ROOT, "news", file.filename);
//         if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
//       }
//       throw new CustomError("News not found", statusCode.NOT_FOUND);
//     }

//     try {
//       // If category is being changed, verify new category exists
//       if (body.categoryId && body.categoryId !== news.categoryId.toString()) {
//         const categoryExists = await NewsCategory.findById(body.categoryId);
//         if (!categoryExists) {
//           if (file) {
//             const tempPath = path.join(UPLOADS_ROOT, "news", file.filename);
//             if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
//           }
//           throw new CustomError("News category not found", statusCode.NOT_FOUND);
//         }
//       }

//       // Check for duplicate name
//       const targetCategoryId = body.categoryId || news.categoryId;
//       const targetName = body.name || news.name;

//       if (body.name || body.categoryId) {
//         const conflict = await News.findOne({
//           _id: { $ne: body.id },
//           name: targetName,
//           categoryId: targetCategoryId,
//         });
//         if (conflict) {
//           if (file) {
//             const tempPath = path.join(UPLOADS_ROOT, "news", file.filename);
//             if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
//           }
//           throw new CustomError(
//             `News with name [${targetName}] already exists in this category`,
//             statusCode.BAD_REQUEST
//           );
//         }
//       }

//       // Parse content array if it's a string
//       if (body.content && typeof body.content === "string") {
//         try {
//           body.content = JSON.parse(body.content);
//         } catch (e) {
//           if (file) {
//             const tempPath = path.join(UPLOADS_ROOT, "news", file.filename);
//             if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
//           }
//           throw new CustomError("Invalid content format", statusCode.BAD_REQUEST);
//         }
//       }

//       // Update fields except id
//       Object.keys(body).forEach((key) => {
//         if (key !== "id") news[key] = body[key];
//       });

//       // Handle new image
//       if (file) {
//         const newImageRelPath = path.join("uploads", "news", file.filename);
//         const newImageFullPath = path.join(UPLOADS_ROOT, "news", file.filename);
//         uploadedFile = newImageFullPath;

//         // Delete old image
//         if (news.image) {
//           const oldImageFullPath = path.join(UPLOADS_ROOT, news.image.replace(/^uploads[\\/]/, ""));
//           if (fs.existsSync(oldImageFullPath)) fs.unlinkSync(oldImageFullPath);
//         }

//         news.image = newImageRelPath;
//       }

//       return await news.save();
//     } catch (error) {
//       if (uploadedFile && fs.existsSync(uploadedFile)) fs.unlinkSync(uploadedFile);
//       throw error;
//     }
//   },

//   remove: async (id) => {
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       throw new CustomError("Invalid news ID format", statusCode.BAD_REQUEST);
//     }

//     const news = await News.findById(id);
//     if (!news) {
//       throw new CustomError("News not found", statusCode.NOT_FOUND);
//     }

//     if (news.image) {
//       const relativePath = news.image.replace(/^uploads[\\/]/, "");
//       const imageFullPath = path.resolve(path.join(UPLOADS_ROOT, relativePath));

//       try {
//         if (fs.existsSync(imageFullPath)) {
//           fs.unlinkSync(imageFullPath);
//           console.log("Image deleted successfully");
//         }
//       } catch (err) {
//         console.error("Failed to delete image:", imageFullPath, err);
//       }
//     }

//     return await News.findByIdAndDelete(id);
//   },

//   getById: async (id) => {
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       throw new CustomError("Invalid news ID format", statusCode.BAD_REQUEST);
//     }

//     const news = await News.findById(id).populate("categoryId");
//     if (!news) {
//       throw new CustomError("News not found", statusCode.NOT_FOUND);
//     }
//     return news;
//   },

//   getActive: async () => {
//     const news = await News.find({ isActive: true })
//       .populate("categoryId")
//       .sort({ createdAt: -1 });
//     return news;
//   },

//   getAll: async () => {
//     const news = await News.find()
//       .populate("categoryId")
//       .sort({ createdAt: -1 });
//     return news;
//   },

//   getNewsByCategoryId: async (categoryId) => {
//     if (!mongoose.Types.ObjectId.isValid(categoryId)) {
//       throw new CustomError("Invalid category ID format", statusCode.BAD_REQUEST);
//     }

//     const news = await News.find({ categoryId })
//       .populate("categoryId")
//       .sort({ createdAt: -1 });
//     return news;
//   },

//   getActiveNewsByCategoryId: async (categoryId) => {
//     if (!mongoose.Types.ObjectId.isValid(categoryId)) {
//       throw new CustomError("Invalid category ID format", statusCode.BAD_REQUEST);
//     }

//     const news = await News.find({ categoryId, isActive: true })
//       .populate("categoryId")
//       .sort({ createdAt: -1 });
//     return news;
//   },
// };

// // ============================================
// // gallery.service.js
// // ============================================

// const Gallery = require("../models/Gallery");

// const galleryService = {
//   add: async (req, res) => {
//     let uploadedFile;
//     try {
//       const data = req.body;
//       const file = req.file;

//       if (!file) {
//         throw new CustomError("Gallery image is required", statusCode.BAD_REQUEST);
//       }

//       // Handle image upload
//       const imageRelativePath = path.join("uploads", "gallery", file.filename);
//       const imageFullPath = path.join(UPLOADS_ROOT, "gallery", file.filename);
//       uploadedFile = imageFullPath;
//       data.image_url = imageRelativePath;

//       return await Gallery.create(data);
//     } catch (error) {
//       if (uploadedFile && fs.existsSync(uploadedFile)) fs.unlinkSync(uploadedFile);
//       throw error;
//     }
//   },

//   update: async (req, res) => {
//     const { body, file } = req;
//     let uploadedFile;

//     if (!mongoose.Types.ObjectId.isValid(body.id)) {
//       throw new CustomError("Invalid gallery ID format", statusCode.BAD_REQUEST);
//     }

//     const gallery = await Gallery.findById(body.id);
//     if (!gallery) {
//       if (file) {
//         const tempPath = path.join(UPLOADS_ROOT, "gallery", file.filename);
//         if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
//       }
//       throw new CustomError("Gallery item not found", statusCode.NOT_FOUND);
//     }

//     try {
//       // Update fields except id
//       Object.keys(body).forEach((key) => {
//         if (key !== "id") gallery[key] = body[key];
//       });

//       // Handle new image
//       if (file) {
//         const newImageRelPath = path.join("uploads", "gallery", file.filename);
//         const newImageFullPath = path.join(UPLOADS_ROOT, "gallery", file.filename);
//         uploadedFile = newImageFullPath;

//         // Delete old image
//         if (gallery.image_url) {
//           const oldImageFullPath = path.join(UPLOADS_ROOT, gallery.image_url.replace(/^uploads[\\/]/, ""));
//           if (fs.existsSync(oldImageFullPath)) fs.unlinkSync(oldImageFullPath);
//         }

//         gallery.image_url = newImageRelPath;
//       }

//       return await gallery.save();
//     } catch (error) {
//       if (uploadedFile && fs.existsSync(uploadedFile)) fs.unlinkSync(uploadedFile);
//       throw error;
//     }
//   },

//   remove: async (id) => {
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       throw new CustomError("Invalid gallery ID format", statusCode.BAD_REQUEST);
//     }

//     const gallery = await Gallery.findById(id);
//     if (!gallery) {
//       throw new CustomError("Gallery item not found", statusCode.NOT_FOUND);
//     }

//     if (gallery.image_url) {
//       const relativePath = gallery.image_url.replace(/^uploads[\\/]/, "");
//       const imageFullPath = path.resolve(path.join(UPLOADS_ROOT, relativePath));

//       try {
//         if (fs.existsSync(imageFullPath)) {
//           fs.unlinkSync(imageFullPath);
//           console.log("Image deleted successfully");
//         }
//       } catch (err) {
//         console.error("Failed to delete image:", imageFullPath, err);
//       }
//     }

//     return await Gallery.findByIdAndDelete(id);
//   },

//   getById: async (id) => {
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       throw new CustomError("Invalid gallery ID format", statusCode.BAD_REQUEST);
//     }

//     const gallery = await Gallery.findById(id);
//     if (!gallery) {
//       throw new CustomError("Gallery item not found", statusCode.NOT_FOUND);
//     }
//     return gallery;
//   },

//   getAll: async () => {
//     const gallery = await Gallery.find().sort({ createdAt: -1 });
//     return gallery;
//   },
// };

// module.exports = { newsService, galleryService }; 