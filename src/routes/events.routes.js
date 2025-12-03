const express = require('express');
const validate = require("../middlewares/validation.middleware.js");
const eventsController = require("../controllers/events.controllers");
const {
  createEvent,
  updateEvent,
  getEventById,
  deleteEvent,
  getEventByYear
} = require("../validations/events.validations.js");
const { uploadEvent } = require('../middlewares/upload.js');
const router = express.Router();

// Create event
router.post('/add', uploadEvent, validate(createEvent), eventsController.add);
// router.post('/add', uploadEvent, eventsController.add);
 
// Update event
router.post('/update', uploadEvent, validate(updateEvent), eventsController.update);

// Get event by ID
router.get('/getById/:id', validate(getEventById), eventsController.getById);

// Get all events
router.get('/getAll', eventsController.getAll); 

// Get featured events
router.get('/getFeatured', eventsController.getFeatured);

// Get events by year
router.get('/getByYear/:year', validate(getEventByYear), eventsController.getByYear);

// Delete event
router.delete('/:id', validate(deleteEvent), eventsController.remove);

module.exports = router;