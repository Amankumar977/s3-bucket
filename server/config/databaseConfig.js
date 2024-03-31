import mongoose from "mongoose"; // Import Mongoose library

// Define a function to connect to the MongoDB database
let connectToDB = async () => {
  // Connect to the MongoDB database using the URL specified in the MONGO_URL environment variable
  await mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
      console.log("The DB is connected"); // Log a message if the connection is successful
    })
    .catch((error) => {
      console.log(error.message); // Log the error message if connection fails
    });
};

export default connectToDB; // Export the connectToDB function
