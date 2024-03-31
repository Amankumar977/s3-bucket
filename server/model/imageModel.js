import mongoose from "mongoose";

// Define the schema for image documents
let schema = new mongoose.Schema(
  {
    // Define the imageName field
    imageName: {
      type: String,
      required: [true, "Please provide the image to continue"], // Make imageName required, show custom error message if not provided
    },
    // Define the imageUrl field
    imageUrl: {
      type: String, // Store the URL of the image
    },
  },
  // Additional options for the schema
  { timestamps: true } // Add timestamps to track createdAt and updatedAt fields
);

// Create the Mongoose model for image documents
const imageModel = mongoose.model("images", schema);

// Export the imageModel
export default imageModel;
