import express from "express";
import {
  handleUploadImage,
  handleGetAllImages,
} from "../controllers/imageContoller.js";
import upload from "../config/multerConfig.js"; // Importing the Multer configuration for handling file uploads

const router = express.Router(); // Creating an instance of Express Router to define routes

/** POST Route for uploading images */
router.route("/uploadImage").post(upload.single("image"), handleUploadImage);
// The above route will handle POST requests to "/uploadImage" endpoint.
// It uses the Multer middleware to handle single file uploads and calls the handleUploadImage controller function.

/** GET Route for retrieving all images */
router.route("/getAllImages").get(handleGetAllImages);
// The above route will handle GET requests to "/getAllImages" endpoint.
// It calls the handleGetAllImages controller function to retrieve all images.

export default router;
