import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import crypto from "crypto";
import imageModel from "../model/imageModel.js";
import { getSignedUrl } from "@aws-sdk/cloudfront-signer";
import sharp from "sharp";

// Function to generate a random image name
const imageName = (byte = 32) => crypto.randomBytes(byte).toString("hex");

// Create an S3 client instance
const client = new S3Client({
  credentials: {
    accessKeyId: process.env.ACCESS_KEY, // Access key ID from environment variables
    secretAccessKey: process.env.SECRET_ACCESS_KEY, // Secret access key from environment variables
  },
  region: process.env.BUCKET_REGION, // Region for the S3 bucket from environment variables
});

// Handler function for uploading images
export async function handleUploadImage(req, res) {
  try {
    const file = req.file; // Extract the uploaded file from the request
    if (!file) {
      console.log("Please provide the required details");
      return res.status(400).json({
        success: false,
        message: "Please provide the required details",
      });
    }
    const nameOfImage = imageName(); // Generate a random name for the image
    // Resize and convert the uploaded image buffer using Sharp
    const buffer = await sharp(req.file.buffer)
      .resize({ height: 950, width: 750, fit: "fill" })
      .toBuffer();
    const params = {
      Bucket: process.env.BUCKET_NAME, // Name of the S3 bucket from environment variables
      Key: nameOfImage, // Key (filename) for the uploaded image in the S3 bucket
      Body: buffer, // Image buffer to upload
      ContentType: req.file.mimetype, // MIME type of the uploaded image
    };
    const command = new PutObjectCommand(params); // Create a PutObjectCommand to upload the image to S3
    const response = await client.send(command); // Send the PutObjectCommand to S3
    if (response.$metadata.httpStatusCode !== 200) {
      // Check if the HTTP status code indicates success
      return res.status(400).json({
        success: false,
        message: "An error occurred while creating the image",
      });
    }
    // Create a record in the database with the image name
    const post = await imageModel.create({
      imageName: nameOfImage,
    });
    if (!post) {
      return res.status(400).json({
        success: false,
        message: "An error occurred while creating the image",
      });
    }
    // Return success response with the created post data
    return res.status(201).json({
      success: true,
      message: "Image created successfully",
      post,
    });
  } catch (error) {
    console.log(error.message);
    // Return error response if an exception occurs
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

// Handler function for retrieving all images
export async function handleGetAllImages(req, res) {
  try {
    // Retrieve all image records from the database, sorted by creation date
    const posts = await imageModel.find({}).sort({ createdAt: -1 });
    if (posts.length === 0) {
      // Check if no images are found
      return res.status(404).json({
        success: false,
        message: "No images found",
      });
    }
    // Iterate through each image record
    for (const post of posts) {
      // Generate a signed URL for accessing the image via CloudFront
      const signedImage = getSignedUrl({
        url: "https://d3auwuys9b7303.cloudfront.net/" + post.imageName, // CloudFront URL for the image
        dateLessThan: new Date(Date.now() + 1000 * 60 * 5), // URL expiration time (5 minutes from now)
        privateKey: process.env.CLOUDFRONT_PRIVATE_KEY, // Private key for signing the URL
        keyPairId: process.env.CLOUDFRONT_KEY_PAIR_ID, // Key pair ID for CloudFront
      });
      console.log("Signed image URL:", signedImage); // Log the signed URL for debugging
      post.imageUrl = signedImage; // Assign the signed URL to the imageUrl property of the image record
    }
    // Return success response with the retrieved image records
    return res.status(200).json({
      success: true,
      message: "Images found",
      posts,
    });
  } catch (error) {
    console.log(error.message);
    // Return error response if an exception occurs
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}
