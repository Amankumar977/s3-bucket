import app from "./app.js"; // Import the Express application instance
import connectToDB from "./config/databaseConfig.js"; // Import the function for connecting to the database

connectToDB(); // Connect to the database

// Start the Express server and listen on the specified port
app.listen(process.env.PORT, () => {
  console.log("The server is started"); // Log a message when the server starts successfully
});
