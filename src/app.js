const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const mongoose = require('mongoose');
mongoose.pluralize(null); // Disable pluralization globally

const { notFound } = require('./middlewares/notFound');

const errorHandler = require('./middlewares/errorHandler.middleware.js');
// const productCategoryRoutes = require('./routes/productCategories.routes');
const {UPLOADS_ROOT}=require("./middlewares/upload.js");
// const productRoutes=require("./routes/product.routes.js");
const contactInfoRoutes=require("./routes/contactInfo.routes.js")
const teamMembersRoutes=require("./routes/teamMembers.routes.js");
// const currenciesRoutes=require("./routes/currencies.routes.js");
// const productUnitsRoutes=require("./routes/productUnits.routes.js");
// const unitQunatitiesRoutes=require("./routes/unitQuantities.routes.js")
const blogsCategoryRoutes=require("./routes/blogsCategory.routes.js");
const blogsRoutes=require("./routes/blogs.routes.js")
// const usersRoutes=require("./routes/users.routes.js");
const adminRoutes=require("./routes/admin.routes.js");
const eventRoutes=require("./routes/events.routes.js");
const collaborativeProjectsRoutes=require("./routes/collaborativeProjects.routes.js");
const servicesRoutes=require('./routes/services.routes');
const serviceCategoriesRoutes=require('./routes/serviceCategories.routes');
const servicesDetailsRoutes=require('./routes/servicesDetails.routes');

const trainingProgramsRoutes = require("./routes/trainingPrograms.routes");
const successStoriesRoutes = require("./routes/successStories.routes");
const trainingApplicationsRoutes = require("./routes/trainingApplications.routes");



const app = express();

// Security middleware
app.use(helmet());

// CORS configuration
// app.use(cors({
//   origin: process.env.ALLOWED_ORIGINS?.split(',') || '*',
//   credentials: true
// }));


app.use(cors({
  origin:[ 'https://www.euryfox.com','https://euryfox.com','https://admin.euryfox.com','https://www.admin.euryfox.com','http://localhost:5173','http://localhost:3000','http://10.138.154.85:4000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
  credentials: true,
}));

app.use(express.json({ limit: '12mb' }));
app.use(express.urlencoded({ extended: true, limit: '12mb' }));



app.use("/rbscience/uploads", express.static(UPLOADS_ROOT, {
  setHeaders: (res) => {
    res.setHeader("Access-Control-Allow-Origin", "*"); 
    res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
  }
}));


app.use(morgan('combined'));
 

// app.use('/rbscience/product-categories', productCategoryRoutes);
// app.use("/rbscience/products",productRoutes);
app.use("/rbscience/contact-info",contactInfoRoutes)
app.use("/rbscience/team-members",teamMembersRoutes)
// app.use("/rbscience/currencies",currenciesRoutes);
// app.use("/rbscience/product-units",productUnitsRoutes);
// app.use("/rbscience/unit-quantities",unitQunatitiesRoutes)
// app.use("/rbscience/users",usersRoutes);
app.use("/rbscience/blogs-category",blogsCategoryRoutes);
app.use("/rbscience/blogs",blogsRoutes);
app.use("/rbscience/admin",adminRoutes);
app.use('/rbscience/events', eventRoutes);
app.use('/rbscience/collaborative-projects', collaborativeProjectsRoutes);
app.use('/rbscience/services', servicesRoutes);
app.use('/rbscience/service-categories', serviceCategoriesRoutes);
app.use('/rbscience/services-details', servicesDetailsRoutes);

app.use("/rbscience/training-programs", trainingProgramsRoutes);
app.use("/rbscience/success-stories", successStoriesRoutes);
app.use("/rbscience/training-applications", trainingApplicationsRoutes);


app.use(notFound);

app.use(errorHandler);

module.exports = app;


