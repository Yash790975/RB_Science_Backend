const Joi = require("joi");

const createEvent = Joi.object({
  body: Joi.object({
    title: Joi.string().required().trim().messages({
      "string.empty": "Event title is required",
      "any.required": "Event title is required"
    }),
    subtitle: Joi.string().trim().allow(null, "").optional(),
    registration_link: Joi.string().required().trim().messages({
      "string.empty": "Registration link is required",
      "any.required": "Registration link is required"
    }),
    year: Joi.string().required().messages({  // Changed from number to string
      "string.empty": "Year is required",
      "any.required": "Year is required"
    }),
    email: Joi.string().email().trim().allow(null, "").optional(),
    event_type: Joi.string().trim().allow(null, "").optional(),
    abstract_deadline: Joi.string().trim().allow(null, "").optional(),
    featured_event: Joi.string().optional(),  // Changed from boolean to string (multer sends as string)
    
    location: Joi.string().required().messages({
      "any.required": "Location is required"
    }),
    
    awards: Joi.string().optional(),
    registration_fees: Joi.string().optional(),
    schedule: Joi.string().optional(),
    venue: Joi.string().optional(),
    payment_details: Joi.string().optional(),
    important_dates: Joi.string().optional(),
    guests: Joi.string().optional(),
    about: Joi.string().optional(),
    brochure_label: Joi.string().optional()  // ← ADDED THIS MISSING FIELD
  }),
  files: Joi.object({
    brochure: Joi.array().items(Joi.object()).optional()
  }).unknown(true)
});

const updateEvent = Joi.object({
  body: Joi.object({
    id: Joi.string().required().messages({
      "string.empty": "Event ID is required",
      "any.required": "Event ID is required"
    }),
    title: Joi.string().trim().optional(),
    subtitle: Joi.string().trim().allow(null, "").optional(),
    registration_link: Joi.string().trim().optional(),
    year: Joi.string().optional(),  // Changed from number to string
    email: Joi.string().email().trim().allow(null, "").optional(),
    event_type: Joi.string().trim().allow(null, "").optional(),
    abstract_deadline: Joi.string().trim().allow(null, "").optional(),
    featured_event: Joi.string().optional(),  // Changed from boolean to string
    
    location: Joi.string().optional(),
    awards: Joi.string().optional(),
    registration_fees: Joi.string().optional(),
    schedule: Joi.string().optional(),
    venue: Joi.string().optional(),
    payment_details: Joi.string().optional(),
    important_dates: Joi.string().optional(),
    guests: Joi.string().optional(),
    about: Joi.string().optional(),
    brochure_label: Joi.string().optional()  // ← ADDED THIS MISSING FIELD
  }),
  files: Joi.object({
    brochure: Joi.array().items(Joi.object()).optional()
  }).unknown(true)
});

const getEventById = Joi.object({
  params: Joi.object({
    id: Joi.string().required().messages({
      "string.empty": "Event ID is required",
      "any.required": "Event ID is required"
    })
  })
});

const deleteEvent = Joi.object({
  params: Joi.object({
    id: Joi.string().required().messages({
      "string.empty": "Event ID is required",
      "any.required": "Event ID is required"
    })
  })
});

const getEventByYear = Joi.object({
  params: Joi.object({
    year: Joi.number().integer().required().messages({
      "number.base": "Year must be a valid number",
      "any.required": "Year is required"
    })
  })
});

module.exports = { 
  createEvent,
  updateEvent,
  getEventById,
  deleteEvent,
  getEventByYear
};





































































// const Joi = require("joi");

// const createEvent = Joi.object({
//   body: Joi.object({
//     title: Joi.string().required().trim().messages({
//       "string.empty": "Event title is required",
//       "any.required": "Event title is required"
//     }),
//     subtitle: Joi.string().trim().allow(null, "").optional(),
//     registration_link: Joi.string().required().trim().messages({
//       "string.empty": "Registration link is required",
//       "any.required": "Registration link is required"
//     }),
//     year: Joi.number().integer().required().messages({
//       "number.base": "Year must be a number",
//       "any.required": "Year is required"
//     }),
//     email: Joi.string().email().trim().allow(null, "").optional(),
//     event_type: Joi.string().trim().allow(null, "").optional(),
//     abstract_deadline: Joi.string().trim().allow(null, "").optional(),
//     featured_event: Joi.boolean().optional(),
    
//     location: Joi.string().required().messages({
//       "any.required": "Location is required"
//     }),
    
//     awards: Joi.string().optional(),
//     registration_fees: Joi.string().optional(),
//     schedule: Joi.string().optional(),
//     venue: Joi.string().optional(),
//     payment_details: Joi.string().optional(),
//     important_dates: Joi.string().optional(),
//     guests: Joi.string().optional(),
//     about: Joi.string().optional()
//   }),
//   files: Joi.object({
//     brochure: Joi.array().items(Joi.object()).optional()
//   }).unknown(true)
// });

// const updateEvent = Joi.object({
//   body: Joi.object({
//     id: Joi.string().required().messages({
//       "string.empty": "Event ID is required",
//       "any.required": "Event ID is required"
//     }),
//     title: Joi.string().trim().optional(),
//     subtitle: Joi.string().trim().allow(null, "").optional(),
//     registration_link: Joi.string().trim().optional(),
//     year: Joi.number().integer().optional(),
//     email: Joi.string().email().trim().allow(null, "").optional(),
//     event_type: Joi.string().trim().allow(null, "").optional(),
//     abstract_deadline: Joi.string().trim().allow(null, "").optional(),
//     featured_event: Joi.boolean().optional(),
    
//     location: Joi.string().optional(),
//     awards: Joi.string().optional(),
//     registration_fees: Joi.string().optional(),
//     schedule: Joi.string().optional(),
//     venue: Joi.string().optional(),
//     payment_details: Joi.string().optional(),
//     important_dates: Joi.string().optional(),
//     guests: Joi.string().optional(),
//     about: Joi.string().optional()
//   }),
//   files: Joi.object({
//     brochure: Joi.array().items(Joi.object()).optional()
//   }).unknown(true)
// });

// const getEventById = Joi.object({
//   params: Joi.object({
//     id: Joi.string().required().messages({
//       "string.empty": "Event ID is required",
//       "any.required": "Event ID is required"
//     })
//   })
// });

// const deleteEvent = Joi.object({
//   params: Joi.object({
//     id: Joi.string().required().messages({
//       "string.empty": "Event ID is required",
//       "any.required": "Event ID is required"
//     })
//   })
// });

// const getEventByYear = Joi.object({
//   params: Joi.object({
//     year: Joi.number().integer().required().messages({
//       "number.base": "Year must be a valid number",
//       "any.required": "Year is required"
//     })
//   })
// });

// module.exports = { 
//   createEvent,
//   updateEvent,
//   getEventById,
//   deleteEvent,
//   getEventByYear
// };