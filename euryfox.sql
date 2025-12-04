use euryfoxdb


db.createUser({
  user: "euryfoxuser",
  pwd: "euryfox1234",   // choose a strong password
  roles: [
    { role: "readWrite", db: "euryfoxdb" }
  ]
})

mongosh -u "euryfoxuser" -p "euryfox1234" 



db.createCollection("product_categories", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["title", "category", "description", "image"],
      properties: {
        title: { bsonType: "string" },
        icon: { bsonType: "string" },
        category: { bsonType: "string" },
        description: { bsonType: "string" },
        image: { bsonType: "string" }
      }
    }
  }
})
db.product_categories.createIndex(
  { title: 1 },
  { unique: true }
);

db.createCollection("products", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["name", "price", "unitId", "inStock", "categoryId"],
      properties: {
        name: { 
          bsonType: "string", 
          description: "Name of the product is required"
        },
        price: { 
          bsonType: "string", 
          description: "Price must be a string (e.g., '199.99')" 
        },
        originalPrice: { 
          bsonType: ["string", "null"], 
          description: "Optional original price before discount" 
        },
        unitId:{
          bsonType: "objectId", 
          description: "Reference to product unit" 
        },
        categoryId: { 
          bsonType: "objectId", 
          description: "Reference to categories collection" 
        },
        images: { 
          bsonType: "array", 
          description: "List of product image URLs", 
          items: { bsonType: "string" }
        },
        rating: { 
          bsonType: "double", 
          description: "Average customer rating (0.0 - 5.0)" 
        },
        reviews: { 
          bsonType: "int", 
          description: "Total number of customer reviews" 
        },
        inStock: { 
          bsonType: "bool", 
          description: "Availability of the product" 
        },
        stockCount: { 
          bsonType: "int", 
          description: "Number of items in stock" 
        },
        discount: { 
          bsonType: ["string", "null"], 
          description: "Discount info (e.g., '10%')" 
        },
        description: { 
          bsonType: ["string", "null"], 
          description: "Short description of the product" 
        },
        longDescription: { 
          bsonType: ["string", "null"], 
          description: "Detailed product description" 
        },
        features: { 
          bsonType: "array", 
          description: "List of product features", 
          items: { bsonType: "string" }
        },
        specifications: { 
          bsonType: "object", 
          description: "Technical specifications in key-value format" 
        },
        benefits: { 
          bsonType: "array", 
          description: "List of benefits", 
          items: { bsonType: "string" }
        }
      },
    }
  }
})

db.products.createIndex(
  { name: 1, categoryId: 1 },
  { unique: true }
);


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



db.createCollection("currencies", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["currency", "name", "flag", "rate", "symbol"],
      properties: {
        code: { bsonType: "string", description: "same as Currency" },
        name: { bsonType: "string", description: "Full currency name like Indian Rupee" },
        flag: { bsonType: "string", description: "Country flag code like IN, US, EU" },
        currency:{bsonType : "string",description:"Currency code like INR, USD, EUR"},
        rate: { bsonType: "string", description: "Rate in context of 1 INR" },
        symbol: { bsonType: "string", description: "Currency symbol like ₹, $, €" }
      }
    }
  }
})
db.currencies.createIndex({ name: 1 }, { unique: true });
db.currencies.createIndex({ flag: 1 }, { unique: true });
db.currencies.createIndex({ currency: 1 }, { unique: true });




db.createCollection("product_units", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["name", "code",],
      properties: {
        name: { bsonType: "string", description: "Full name of the unit, e.g., Kilogram, Gram" },
        code: { bsonType: "string", description: "Short code of the unit, e.g., kg, g, pc" },
        type: { bsonType: "string", description: "Type of unit: weight, volume, count, length, area, other" },
        description: { bsonType: "string", description: "Optional description about the unit" },
      
      }
    }
  }
});
db.product_units.createIndex({ code: 1 }, { unique: true });
db.product_units.createIndex({ name: 1 }, { unique: true });


db.createCollection("unit_quantities", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["unitId", "quantities"],
      properties: {
        unitId: { 
          bsonType: "objectId", 
          description: "Reference to product_units._id" 
        },
        quantities: {
          bsonType: "array",
          description: "Array of quantity objects for this unit",
          items: {
            bsonType: "object",
            required: ["value", "label", "multiplier"],
            properties: {
              value: { bsonType: "string", description: "Value code, e.g., kg, 10kg" },
              label: { bsonType: "string", description: "Display label, e.g., 1 kg" },
              multiplier: { bsonType: "number", description: "Multiplier relative to base unit" }
            }
          }
        }
      }
    }
  }
});
db.unit_quantities.createIndex({ unitId: 1 },{ unique: true });




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




db.products.insertMany([
  {
    name: "Potato Chips",
    price: "₹99.00",
    originalPrice: "₹120.00",
    unitId: ObjectId("68b563a693d721e620eec4b4"), // Piece
    categoryId: ObjectId("68b56ba493d721e620eec4bb"), // Snacks
    images: [
      "uploads/products/organic-almondss_898724.jpeg",
      "uploads/products/product_247056.png",
      "uploads/products/deepak_178425.jpeg"
    ],
    rating: 4.2,
    reviews: 300,
    inStock: true,
    stockCount: 500,
    discount: "20",
    description: "Crispy and crunchy potato chips.",
    longDescription: "Classic salted potato chips made from the finest potatoes for a perfect snack.",
    features: ["Crispy texture", "Lightly salted"],
    specifications: { weight: "100g", origin: "India" },
    benefits: ["Great taste", "Perfect party snack"]
  },
  {
    name: "Chocolate Cookies",
    price: "₹199.00",
    originalPrice: "₹250.00",
    unitId: ObjectId("68b563a693d721e620eec4b4"),
    categoryId: ObjectId("68b56ba493d721e620eec4bb"),
    images: [
      "uploads/products/organic-almondss_898724.jpeg",
      "uploads/products/product_247056.png",
      "uploads/products/deepak_178425.jpeg"
    ],
    rating: 4.8,
    reviews: 85,
    inStock: true,
    stockCount: 200,
    discount: "10",
    description: "Delicious chocolate chip cookies.",
    longDescription: "Freshly baked cookies with chunks of chocolate, perfect for tea-time or snacking.",
    features: ["Rich chocolate chips", "Freshly baked"],
    specifications: { weight: "150g", origin: "India" },
    benefits: ["Mood booster", "Kids love it"]
  },
  {
    name: "Roasted Cashews",
    price: "₹399.00",
    originalPrice: "₹450.00",
    unitId: ObjectId("68b563a693d721e620eec4b4"),
    categoryId: ObjectId("68b56ba493d721e620eec4bb"),
    images: [
      "uploads/products/organic-almondss_898724.jpeg",
      "uploads/products/product_247056.png",
      "uploads/products/deepak_178425.jpeg"
    ],
    rating: 4.6,
    reviews: 95,
    inStock: true,
    stockCount: 120,
    discount: "12",
    description: "Crunchy roasted cashew nuts.",
    longDescription: "Perfectly roasted cashews seasoned lightly to enhance the natural nutty flavor.",
    features: ["Rich in minerals", "Crispy texture"],
    specifications: { weight: "200g", origin: "Goa, India" },
    benefits: ["Supports immunity", "Healthy fat source"]
  },
  {
    name: "Trail Mix",
    price: "₹299.00",
    originalPrice: "₹350.00",
    unitId: ObjectId("68b563a693d721e620eec4b4"),
    categoryId: ObjectId("68b56ba493d721e620eec4bb"),
    images: [
      "uploads/products/organic-almondss_898724.jpeg",
      "uploads/products/product_247056.png",
      "uploads/products/deepak_178425.jpeg"
    ],
    rating: 4.4,
    reviews: 60,
    inStock: true,
    stockCount: 180,
    discount: "15",
    description: "Nutritious trail mix of dried fruits and nuts.",
    longDescription: "A balanced mix of raisins, almonds, cashews, and dried berries for a healthy snack option.",
    features: ["High in fiber", "Energy boosting"],
    specifications: { weight: "300g", origin: "India" },
    benefits: ["Great for fitness", "Quick energy supply"]
  }
]);



-- update products table
db.runCommand({
  collMod: "products",
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["name", "price", "unitId", "inStock", "categoryId"], // thomps is NOT required
      properties: {
        name: { 
          bsonType: "string", 
          description: "Name of the product is required"
        },
        price: { 
          bsonType: "string", 
          description: "Price must be a string (e.g., '199.99')" 
        },
        originalPrice: { 
          bsonType: ["string", "null"], 
          description: "Optional original price before discount" 
        },
        unitId:{
          bsonType: "objectId", 
          description: "Reference to product unit" 
        },
        categoryId: { 
          bsonType: "objectId", 
          description: "Reference to categories collection" 
        },
        images: { 
          bsonType: "array", 
          description: "List of product image URLs", 
          items: { bsonType: "string" }
        },
        rating: { 
          bsonType: "double", 
          description: "Average customer rating (0.0 - 5.0)" 
        },
        reviews: { 
          bsonType: "int", 
          description: "Total number of customer reviews" 
        },
        inStock: { 
          bsonType: "bool", 
          description: "Availability of the product" 
        },
        stockCount: { 
          bsonType: "int", 
          description: "Number of items in stock" 
        },
        discount: { 
          bsonType: ["string", "null"], 
          description: "Discount info (e.g., '10%')" 
        },
        description: { 
          bsonType: ["string", "null"], 
          description: "Short description of the product" 
        },
        longDescription: { 
          bsonType: ["string", "null"], 
          description: "Detailed product description" 
        },
        features: { 
          bsonType: "array", 
          description: "List of product features", 
          items: { bsonType: "string" }
        },
        specifications: { 
          bsonType: "object", 
          description: "Technical specifications in key-value format" 
        },
        benefits: { 
          bsonType: "array", 
          description: "List of benefits", 
          items: { bsonType: "string" }
        },
        
        thomps: {
          bsonType: "bool",
          description: "Indicates if Thomps features are enabled (optional)"
        },
        bestSellingProducts: { 
          bsonType: "bool",
          description: "Indicates if this is a best-selling product; relevant only when thomps is true"
        },
        signatureFlavorsProducts: { 
          bsonType: "bool",
          description: "Indicates if signature product flavors are enabled; relevant only when thomps is true"
        }
      }
    }
  },
  validationLevel: "moderate"
});


db.createCollection("users", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["emailAddress"],
      properties: {
        fullName: { 
          bsonType: "string", 
          description: "Full name of the user" 
        },
        emailAddress: { 
          bsonType: "string", 
          description: "Email address of the user"
        },
        mobileNumber: { 
          bsonType: "string", 
          description: "Mobile number of the user"
        },
        address: { 
          bsonType: "string", 
          description: "Address of the user"
        }
      }
    }
  }
});
db.users.createIndex({ emailAddress: 1 }, { unique: true });


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