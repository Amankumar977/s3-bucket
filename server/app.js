import express from "express";
import "dotenv/config"; // Load environment variables from .env file
import morgan from "morgan"; // Middleware for logging HTTP requests
import imageRoute from "./routes/imageRoute.js"; // Import router configuration for image-related routes
import cors from "cors"; // Middleware for enabling Cross-Origin Resource Sharing (CORS)

const app = express(); // Create an instance of the Express application

app.use(express.json()); // Middleware to parse JSON bodies in incoming requests
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies in incoming requests
app.disable("x-powered-by"); // Disable the x-powered-by header for security reasons
app.use(morgan("tiny")); // Use Morgan middleware with the "tiny" format for logging HTTP requests

app.use(
  cors({
    // Configure CORS middleware
    origin: ["https://s3-bucket-qi6q.vercel.app"], // Allow requests only from the specified frontend URL
    httpOnly: true, // Allow only HTTP-only cookies
    secure: true, // Allow only secure requests
  })
);

// Define a route for the root endpoint ("/") to respond with a simple "Hello" message
app.get("/", (req, res) => {
  res.send("<h1>Hello</h1>");
});

// Mount the imageRoute router at the "/api/v1/image" endpoint
app.use("/api/v1/image", imageRoute);

export default app; // Export the Express application instance
