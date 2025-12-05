



db.createCollection("contact_info", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: [
        "mobileNumber",
        "infoEmail",
        "salesEmail",
        "supportEmail",
        "officeAddress",
        "phoneNumbers",
        "emails",
        "businessHours",
        "longitude",
        "latitude",
      ],
      properties: {
        mobileNumber: { bsonType: "string" },
        infoEmail: { bsonType: "string" },
        salesEmail: { bsonType: "string" },
        supportEmail: { bsonType: "string" },
        officeAddress: {
          bsonType: "array",
          items: { bsonType: "string" }
        },
        phoneNumbers: {
          bsonType: "array",
          items: { bsonType: "string" }
        },
        emails: {
          bsonType: "array",
          items: { bsonType: "string" }
        },
        businessHours: {
          bsonType: "array",
          items: { bsonType: "string" }
        },
            latitude: { bsonType: "double" },
            longitude: { bsonType: "double" },

        isActive: { bsonType: "bool" },   
      }
    }
  }
});




db.createCollection("team_members", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["name", "role", "image", "description"],
      properties: {
        name: { bsonType: "string" },
        role: { bsonType: "string" },
        image: { bsonType: "string" },
        description: { bsonType: "string" },
        isActive: { bsonType: "bool" } 
      }
    }
  }
});


db.team_members.createIndex({ role: 1 }, { unique: true });





db.createCollection("blogs_category", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["name","category"],
      properties: {
        category:{bsonType:"string"},
        name: { bsonType: "string" },
        isActive: { bsonType: "bool" }
      }
    }
  }
});

db.blogs_category.createIndex(
  { name: 1 },
  { unique: true }
);






db.createCollection("blogs", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: [
        "name",
        "slug",
        "title",
        "excerpt",
        "content",
        "author",
        "date",
        "publishedAt",
        "categoryId",
        "isActive",
        "featured"
      ],
      properties: {
        name:{bsonType: "string"},
        slug: { bsonType: "string" },
        title: { bsonType: "string" },
        excerpt: { bsonType: "string" },
         content: {
          bsonType: "array",
          items: {
            bsonType: "object",
            required: ["heading", "para"],
            properties: {
              heading: { bsonType: "string" },
              para: { bsonType: "string" }
            }
          }
        },
        author: { bsonType: "string" },
        authorRole: { bsonType: ["string", "null"] },
        authorImage: { bsonType: ["string", "null"] },
        date: { bsonType: "date" },
        publishedAt: { bsonType: "date" },
        readTime: { bsonType: ["string", "null"] },
        categoryId: { bsonType: "objectId" },
        tags: { bsonType: "array", items: { bsonType: "string" } },
        image: { bsonType: ["string", "null"] },
        views: { bsonType: "int" },
        likes: { bsonType: "int" },
        comments: { bsonType: "int" },
        isActive: { bsonType: "bool" },
        featured: { bsonType: "bool" }
      }
    }
  }
});
db.blogs.createIndex({ name: 1, categoryId: 1 }, { unique: true });





db.createCollection("events", {
  validator: {
    $jsonSchema: {
      bsonType: "object",

      required: ["title", "year", "location", "registration_link"],

      properties: {

        title: { bsonType: "string" },
        subtitle: { bsonType: "string" },
        registration_link: { bsonType: "string" },

        year: { bsonType: "int" },
        email: { bsonType: "string" },

        event_type: { bsonType: "string" },
        abstract_deadline: { bsonType: "string" },
        featured_event: { bsonType: "bool" },

        location: {
          bsonType: "object",
          required: ["city", "country"],
          properties: {
            city: { bsonType: "string" },
            country: { bsonType: "string" }
          }
        },

        awards: {
          bsonType: "array",
          items: {
            bsonType: "object",
            required: ["title"],
            properties: {
              icon: { bsonType: "string" },
              title: { bsonType: "string" },
              criteria: { bsonType: "string" }
            }
          }
        },

        registration_fees: {
          bsonType: "object",
          properties: {
            early_bird_deadline: { bsonType: "string" },
            categories: {
              bsonType: "array",
              items: {
                bsonType: "object",
                properties: {
                  type: { bsonType: "string" },
                  early_bird: { bsonType: "int" },
                  regular: { bsonType: "int" },
                  icon: { bsonType: "string" }
                }
              }
            }
          }
        },

        schedule: {
          bsonType: "array",
          items: {
            bsonType: "object",
            properties: {
              time: { bsonType: "string" },
              activity: { bsonType: "string" },
              icon: { bsonType: "string" }
            }
          }
        },

        venue: {
          bsonType: "object",
          properties: {
            name: { bsonType: "string" },
            address: { bsonType: "string" }
          }
        },

        payment_details: {
          bsonType: "object",
          properties: {
            phoneNumber: { bsonType: "string" },
            bank_account: {
              bsonType: "object",
              properties: {
                account: { bsonType: "string" },
                ifsc: { bsonType: "string" },
                bank: { bsonType: "string" },
                branch: { bsonType: "string" }
              }
            }
          }
        },

        important_dates: {
          bsonType: "array",
          items: {
            bsonType: "object",
            required: ["label", "date"],
            properties: {
              label: { bsonType: "string" },
              date: { bsonType: "string" }
            }
          }
        },

        guests: {
          bsonType: "array",
          items: {
            bsonType: "object",
            properties: {
              type: { bsonType: "string" },
              name: { bsonType: "string" },
              designation: { bsonType: "string" },
              organization: { bsonType: "string" },
              icon: { bsonType: "string" }
            }
          }
        },

        about: {
          bsonType: "object",
          properties: {
            description: { bsonType: "string" },
            tagline: { bsonType: "string" }
          }
        },

        brochure: {
          bsonType: "object",
          properties: {
            available: { bsonType: "bool" },
            label: { bsonType: "string" },
            link: { bsonType: "string" }
          }
        }
      }
    }
  }
});


 

db.events.insertOne({
  title: "RB Science Foundation Day",
  subtitle: "How New Drugs Are Discovered",
  registration_link: "https://rbsfoundation.in/register",
  year: 2025,
  email: "rbsconference2025@gmail.com",
  event_type: "Research Conference",
  abstract_deadline: "2025-08-20",
  featured_event: true,

  location: {
    city: "Bhopal",
    country: "India"
  },

  awards: [
    { icon: "🌟", title: "Young Researcher Award", criteria: "Age ≤ 30 years" },
    { icon: "💊", title: "Drug Delivery Excellence", criteria: "Research Innovation" },
    { icon: "🔬", title: "Drug Discovery Excellence", criteria: "Breakthrough Research" },
    { icon: "🌿", title: "Herbal Drugs Excellence", criteria: "Natural Medicine" },
    { icon: "🧬", title: "Molecular Pharmacology", criteria: "Advanced Research" },
    { icon: "🏥", title: "Clinical Research Excellence", criteria: "Patient Impact" },
    { icon: "🎓", title: "Budding Researcher Award", criteria: "UG Students" }
  ],

  registration_fees: {
    early_bird_deadline: "2025-09-01",
    categories: [
      { type: "UG/PG Students", early_bird: 500, regular: 750, icon: "🎓" },
      { type: "Ph.D. Scholars", early_bird: 1000, regular: 1250, icon: "🔬" },
      { type: "Faculty", early_bird: 1200, regular: 1500, icon: "👨‍🏫" },
      { type: "Industry Personnel", early_bird: 2000, regular: 2500, icon: "💼" }
    ]
  },

  schedule: [
    { time: "9:00 AM", activity: "Spot Registration", icon: "📝" },
    { time: "10:00 AM", activity: "Inauguration", icon: "🎉" },
    { time: "10:30 AM", activity: "Award Distribution", icon: "🏆" },
    { time: "11:00 AM", activity: "Tea Break", icon: "☕" },
    { time: "11:30 AM", activity: "Keynote Speech", icon: "🎤" },
    { time: "1:00 PM", activity: "Lunch", icon: "🍽️" },
    { time: "2:00 PM", activity: "Industry Interaction", icon: "🤝" },
    { time: "3:00 PM", activity: "Presentations", icon: "📊" },
    { time: "4:00 PM", activity: "Valedictory", icon: "🎊" }
  ],

  venue: {
    name: "RB Science Research Lab",
    address: "Opp. Irshad Farms, Padariya Sankal, Raisen Road, Bhopal"
  },

  payment_details: {
    phoneNumber: "7000882050",
    bank_account: {
      account: "50380200000315",
      ifsc: "BARB0AYOBHO",
      bank: "Bank of Baroda",
      branch: "Ayodhya Nagar, Bhopal"
    }
  },

  important_dates: [
    { label: "Award Nominations", date: "2025-08-20" },
    { label: "Abstract Submission", date: "2025-08-25" },
    { label: "Abstract Confirmation", date: "2025-09-01" }
  ],

  guests: [
    {
      type: "Chief Guest",
      name: "Shri Sanjay Jain",
      designation: "President",
      organization: "MP, PCI",
      icon: "👑"
    },
    {
      type: "Keynote Speaker",
      name: "Dr. Amit Joharapurkar",
      designation: "Scientist",
      organization: "Zydus Research Center",
      icon: "🎤"
    },
    {
      type: "Special Guest",
      name: "Mr. Bhojraj Tiwari",
      designation: "Senior Expert",
      organization: "Shockwave Medical, J&J",
      icon: "⭐"
    }
  ],

  about: {
    description:
      "ISO 9001:2015 certified CRO approved by AICTE, offering industry-based training and pharmaceutical research programs.",
    tagline: "Leader in Training"
  },

  brochure: {
    available: true,
    label: "Download Brochure",
    link: "https://rbsfoundation.in/brochure.pdf"
  },
});


db.createCollection("collaborativeprojects", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["image", "title", "description", "university"],
      properties: {
        image: {
          bsonType: "string",
          description: "Image URL is required"
        },
        title: {
          bsonType: "string",
          description: "Title is required",
          maxLength: 200
        },
        description: {
          bsonType: "string",
          description: "Description is required",
          maxLength: 1000
        },
        university: {
          bsonType: "string",
          description: "University name is required"
        },
        isActive: {
          bsonType: "bool",
          description: "Activation status"
        },
        createdAt: {
          bsonType: "date"
        },
        updatedAt: {
          bsonType: "date"
        }
      }
    }
  }
});




db.createCollection("services", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["title", "is_active"], 
      properties: {
        title: {
          bsonType: "string",
          description: "Service name",
        },
        is_active: {
          bsonType: "bool",
          description: "Service active/inactive status"
        }
      }
    }
  }
})

// Create UNIQUE INDEX on title
db.services.createIndex({ title: 1 }, { unique: true })




db.createCollection("service_categories", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["title", "service_id", "is_active"],
      properties: {
        title: {
          bsonType: "string",
          description: "Category title"
        },
        description: {
          bsonType: "string",
          description: "Optional description"
        },
        service_id: {
          bsonType: "objectId",
          description: "Foreign key connected to services._id"
        },
        is_active: {
          bsonType: "bool",
          description: "Active/inactive status"
        }
      }
    }
  }
})


db.service_categories.createIndex({service_id:1, title: 1 }, { unique: true })
db.service_categories.createIndex({ service_id: 1 })





db.createCollection("services_details", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["title", "service_category_id"],
      properties: {
        title: { bsonType: "string" },
        description: { bsonType: "string" },

        service_category_id: {
          bsonType: "objectId",
          description: "FK to service_categories._id"
        },

        featured: {
          bsonType: "array",
          items: {
            bsonType: "string"
          }
        },

        image_url: { bsonType: "string" },

        long_description: {
          bsonType: "array",
          items: {
            bsonType: "object",
            required: ["label", "description"],
            properties: {
              label: { bsonType: "string" },
              description: { bsonType: "string" }
            }
          }
        }
      }
    }
  }
})


db.services_details.createIndex({ service_category_id: 1 })






db.createCollection("training_programs", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["title", "screen_name", "features", "weeks","fees"],
      properties: {
        title: { bsonType: "string" },

        screen_name: { bsonType: "string" }, 
        // example values: "internship", "full-time"

        description: { bsonType: "string" },

        weeks: { bsonType: "string" },   // e.g., "4 weeks"
        fees: { bsonType: "string" },    // e.g., "₹3000" by default value should be 0

        features: {
          bsonType: "array",
          items: {
            bsonType: "string"
          }
        }
      }
    }
  }
})


db.createCollection("success_stories", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["name", "position"],
      properties: {
        name: { bsonType: "string" },
        position: { bsonType: "string" },
        description: { bsonType: "string" }
      }
    }
  }
})


db.createCollection("training_applications", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: [
        "fullname",
        "email",
        "phoneNumber",
        "education_level",
        "preferred_program_id",
        "reason"
      ],
      properties: {
        fullname: { bsonType: "string" },
        email: { bsonType: "string" },
        phoneNumber: { bsonType: "string" },

        education_level: { bsonType: "string" },

        preferred_program_id: {
          bsonType: "objectId",
          description: "FK to training_programs._id"
        },

        reason: { bsonType: "string" }
      }
    }
  }
})



  












  
  // new 04-12-2025
  
  -- it is same as the services module, only some fields names are changed

db.createCollection("facilities", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["title", "is_active"], 
      properties: {
        title: {
          bsonType: "string",
          description: "facility name",
        },
        is_active: {
          bsonType: "bool",
          description: "facility active/inactive status"
        }
      }
    }
  }
})

// Create UNIQUE INDEX on title
db.services.createIndex({ title: 1 }, { unique: true })




db.createCollection("facility_categories", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["title", "facility_id", "is_active"],
      properties: {
        title: {
          bsonType: "string",
          description: "Category title"
        },
        description: {
          bsonType: "string",
          description: "Optional description"
        },
        facility_id: {
          bsonType: "objectId",
          description: "Foreign key connected to services._id"
        },
        is_active: {
          bsonType: "bool",
          description: "Active/inactive status"
        }
      }
    }
  }
})


db.service_categories.createIndex({facility_id:1, title: 1 }, { unique: true })
db.service_categories.createIndex({ service_id: 1 })





db.createCollection("facility_details", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["title", "facility_category_id"],
      properties: {
        title: { bsonType: "string" },
        description: { bsonType: "string" },

        facility_category_id: {
          bsonType: "objectId",
          description: "FK to service_categories._id"
        },

        featured: {
          bsonType: "array",
          items: {
            bsonType: "string"
          }
        },

        image_url: { bsonType: "string" },

        long_description: {
          bsonType: "array",
          items: {
            bsonType: "object",
            required: ["label", "description"],
            properties: {
              label: { bsonType: "string" },
              description: { bsonType: "string" }
            }
          }
        }
      }
    }
  }
})


db.services_details.createIndex({ facility_category_id: 1 })




-- certification :  this is the same as the facility_details table with minor changes. you can just copy the entire code 
-- from that collection to create this one 


db.createCollection("Certificates", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["title","description","image_url"],
      properties: {
        title: { bsonType: "string" },
        description: { bsonType: "string" },
        featured: {
          bsonType: "array",
          items: {
            bsonType: "string"
          }
        },

        image_url: { bsonType: "string" },

        long_description: {
          bsonType: "array",
          items: {
            bsonType: "object",
            required: ["label", "description"],
            properties: {
              label: { bsonType: "string" },
              description: { bsonType: "string" }
            }
          }
        }
      }
    }
  }
})







-- news :  this is the same as the blogs table with minor changes. you can just copy the entire code 
-- from that collection to create this one 


db.createCollection("news_category", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["name","category"],
      properties: {
        category:{bsonType:"string"},
        name: { bsonType: "string" },
        isActive: { bsonType: "bool" }
      }
    }
  }
});

db.news_category.createIndex(
  { name: 1 },
  { unique: true }
);


db.createCollection("news", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: [
        "name",
        "slug",
        "title",
        "excerpt",
        "content",
        "date",
        "publishedAt",
        "categoryId",
        "isActive",
      ],
      properties: {
        name:{bsonType: "string"},
        slug: { bsonType: "string" },
        title: { bsonType: "string" },
        excerpt: { bsonType: "string" },
         content: {
          bsonType: "array",
          items: {
            bsonType: "object",
            required: ["heading", "para"],
            properties: {
              heading: { bsonType: "string" },
              para: { bsonType: "string" }
            }
          }
        },
        date: { bsonType: "date" },
        publishedAt: { bsonType: "date" },
        readTime: { bsonType: ["string", "null"] },
        categoryId: { bsonType: "objectId" },  //news category id
        image: { bsonType: ["string", "null"] },  
        isActive: { bsonType: "bool" },
      }
    }
  }
});
db.news.createIndex({ name: 1, categoryId: 1 }, { unique: true });






-- gallery :  this is the same as the certificates table with minor changes. you can just copy the entire code 
-- from that collection to create this one 

db.createCollection("gallery", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["title","description","image_url"],
      properties: {
        title: { bsonType: "string" },
        description: { bsonType: "string" },
        image_url: { bsonType: "string" },
      }
    }
  }
})






  