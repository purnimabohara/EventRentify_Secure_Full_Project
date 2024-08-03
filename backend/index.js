// // importing necessary modules
// const express = require("express");
// const dotenv = require("dotenv");
// const connectDB = require("./database/db");
// const cors = require("cors");
// const multiparty = require("connect-multiparty");
// const cloudinary = require("cloudinary").v2;
// const https = require("https");
// const fs = require("fs");
// const waf = require('./middleware/waf');






// const helmet = require("helmet");
// // app.use(
// //     helmet.contentSecurityPolicy({
// //       directives: {
// //         defaultSrc: ["'self'"],
// //         scriptSrc: ["'self'", "trusted-cdn.com"],
// //         objectSrc: ["'none'"],
// //         upgradeInsecureRequests: [],
// //       },
// //     })
// //   );
// const compression = require("compression");

// const rateLimit = require("express-rate-limit");
// const mongoSanitize = require("express-mongo-sanitize");

// const hpp = require("hpp");

// const csrf = require("csurf");
// const session = require("express-session");
// const requestIp = require("request-ip");
// const { RateLimiterMemory } = require("rate-limiter-flexible");

// // Making express app
// const app = express();
// // Use the WAF middleware
// app.use(waf);

// // Disable console.log in production environment
// if (process.env.NODE_ENV !== 'production') {
//   console.log("Debug Message");  // Logs only in development mode
// } else {
//   console.log = function() {};  // Disable console.log in production
// }

// // dotenv config
// dotenv.config();

// // Connect to MongoDB
// connectDB();

// // Set up middleware
// app.use(helmet()); // Adds security-related HTTP headers

// app.use(compression()); 


// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 500, // Limit each IP to 100 requests per windowMs
//   message: "Too many requests from this IP, please try again later.",
// });
// app.use(limiter);

// const rateLimiter = new RateLimiterMemory({
//   points: 100, // 5 requests
//   duration: 1, // per second
// });

// app.use((req, res, next) => {
//   rateLimiter
//     .consume(req.ip)
//     .then(() => {
//       next();
//     })
//     .catch(() => {
//       res.status(429).send("Too Many Requests");
//     });
// }); 

// // Sanitize request data to prevent NoSQL injection
// app.use(mongoSanitize());

// // Prevent HTTP parameter pollution
// app.use(hpp());

// // CORS configuration
// // const corsPolicy = {
// //   origin: true,
// //   credentials: true,
// //   optionSuccessStatus: 200,
// // };
// // app.use(cors(corsPolicy));
// // app.use(
// //   cors({
// //     origin: "https://localhost:3000",
// //     methods: ["GET", "POST", "PUT", "DELETE"],
// //     credentials: true,
// //   })
// // );
// const corsOptions = {
//   origin: "https://localhost:3000",
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   credentials: true,
//   optionsSuccessStatus: 200,
//   allowedHeaders: ["Content-Type", "Authorization"],
// };

// app.use(cors(corsOptions));
// app.options("*", cors(corsOptions));

// // Get client's IP address
// app.use(requestIp.mw());

// app.use(multiparty());

// // Cloudinary configuration for image upload
// cloudinary.config({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.API_KEY,
//   api_secret: process.env.API_SECRET,
// });


// // Session management with secure cookies
// app.use(
//   session({
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: true,
//     cookie: {
//       secure: process.env.NODE_ENV === "production", // Ensures cookies are only sent over HTTPS in production
//       httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
//       maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
//     },
//   })
// );

// // Accepting json data
// app.use(express.json());

// // Test route
// app.get("/test", (req, res) => {
//   res.send("Hello");
// });

// // User and admin routes
// app.use("/api/user", require("./routes/userRoutes"));
// app.use("/api/admin", require("./routes/adminRoute"));

// // Defining port and running the server
// // const PORT = process.env.PORT;
// // app.listen(PORT, () => {
// //     console.log(`Server is running on port ${PORT}`);
// // });
// const options = {
//   key: fs.readFileSync("key.pem"),
//   cert: fs.readFileSync("cert.pem"),
// };

// const PORT = process.env.PORT || 5000;
// https.createServer(options, app).listen(PORT, () => {
//   console.log(`HTTPS Server is running on port ${PORT}`);
// });


















// // CSRF protection (add only to routes that require it)
// const csrfProtection = csrf({ cookie: true });
// // app.use('/some-secure-route', csrfProtection, yourRouteHandler);
// // Exporting the app for testing or other purposes
// module.exports = app;
// Importing necessary modules
const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./database/db");
const cors = require("cors");
const multiparty = require("connect-multiparty");
const cloudinary = require("cloudinary").v2;
const https = require("https");
const fs = require("fs");
const helmet = require("helmet");
const compression = require("compression");
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");
const hpp = require("hpp");
const csrf = require("csurf");
const session = require("express-session");
const requestIp = require("request-ip");
const { RateLimiterMemory } = require("rate-limiter-flexible");


// Importing the WAF middleware
const waf = require('./middleware/waf');
const logRequests=require('./middleware/logRequests');
// Making express app
const app = express();

// Disable console.log in production environment

if (process.env.NODE_ENV !== 'production') {
  console.log("Debug Message");  
} else {
  console.log = function() {};  
}

// dotenv config
dotenv.config();

// Connect to MongoDB
connectDB();

// Set up middleware
app.use(helmet()); // Adds security-related HTTP headers

app.use(compression()); // Compresses responses


app.use(waf);

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 500, 
  message: "Too many requests from this IP, please try again later.",
});
app.use(limiter);

const rateLimiter = new RateLimiterMemory({
  points: 100, 
  duration: 1, 
});

app.use((req, res, next) => {
  rateLimiter
    .consume(req.ip)
    .then(() => {
      next();
    })
    .catch(() => {
      res.status(429).send("Too Many Requests");
    });
}); 



// Sanitize request data to prevent NoSQL injection
app.use(mongoSanitize());

// Prevent HTTP parameter pollution
app.use(hpp());

// CORS configuration
const corsOptions = {
  origin: "https://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
  optionsSuccessStatus: 200,
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

// Get client's IP address
app.use(requestIp.mw());

app.use(multiparty());

// Cloudinary configuration for image upload
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// Session management with secure cookies
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: process.env.NODE_ENV === "production", // Ensures cookies are only sent over HTTPS in production
      httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    },
  })
);
app.use(logRequests);

// Accepting JSON data
app.use(express.json());

// Test route
app.get("/test", (req, res) => {
  res.send("Hello");
});

// User and admin routes
app.use("/api/user", require("./routes/userRoutes"));
app.use("/api/admin", require("./routes/adminRoute"));

// Defining port and running the server
const options = {
  key: fs.readFileSync("key.pem"),
  cert: fs.readFileSync("cert.pem"),
};

const PORT = process.env.PORT || 5000;
https.createServer(options, app).listen(PORT, () => {
  console.log(`HTTPS Server is running on port ${PORT}`);
});


module.exports = app;
