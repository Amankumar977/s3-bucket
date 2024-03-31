---

# Image Upload and Retrieval System

This project implements an image upload and retrieval system using Node.js, Express.js, MongoDB, AWS S3, and AWS CloudFront.

## Introduction

This project provides a backend system for uploading images, storing them in an AWS S3 bucket, and retrieving them with signed URLs through AWS CloudFront. It also includes endpoints for retrieving all uploaded images.

## Features

- Upload images and store them in an AWS S3 bucket.
- Generate signed URLs for secure retrieval of images through AWS CloudFront.
- Retrieve all uploaded images with their signed URLs.
- Logging of HTTP requests using Morgan middleware.
- CORS configuration to allow requests only from specified origins.

## Technologies Used

- Node.js
- Express.js
- MongoDB (with Mongoose)
- AWS S3
- AWS CloudFront
- Multer (for handling file uploads)
- Morgan (for HTTP request logging)
- CORS (for Cross-Origin Resource Sharing)
- dotenv (for managing environment variables)

## Getting Started

### Prerequisites

- Node.js (version >= 14.0.0)
- npm (or yarn)
- MongoDB (running locally or remotely)
- AWS S3 Bucket
- AWS CloudFront Distribution
- Frontend application for interacting with the API (not included in this project)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/beneath-a-tree-bucket
   ```

2. Install dependencies:

   ```bash
   cd beneath-a-tree-bucket
   npm install
   ```

3. Set up environment variables:

   Create a `.env` file in the root directory of the project and add the following variables:

   ```
   PORT=3000
   MONGO_URL=mongodb://localhost:27017/image_db
   ACCESS_KEY=your_aws_access_key
   SECRET_ACCESS_KEY=your_aws_secret_access_key
   BUCKET_REGION=your_bucket_region
   BUCKET_NAME=your_bucket_name
   CLOUDFRONT_PRIVATE_KEY=your_cloudfront_private_key
   CLOUDFRONT_KEY_PAIR_ID=your_cloudfront_key_pair_id
   FRONTEND_URL=http://localhost:3000
   ```

   Replace the placeholders with your actual values.

4. Start the server:

   ```bash
   npm run dev
   ```

## Usage

1. Uploading an Image:

   Send a POST request to `/api/v1/image/uploadImage` endpoint with a form-data body containing an image file.

2. Retrieving All Images:

   Send a GET request to `/api/v1/image/getAllImages` endpoint to retrieve all uploaded images with their signed URLs.

## API Documentation

### POST /api/v1/image/uploadImage

- Description: Uploads an image to the server and stores it in AWS S3 bucket.
- Request Body: Form-data with `image` field containing the image file.
- Response: JSON object with details of the uploaded image.

### GET /api/v1/image/getAllImages

- Description: Retrieves all uploaded images with their signed URLs.
- Response: JSON array containing objects with `imageName` and `imageUrl` fields for each image.


## Acknowledgements

- Thanks to [Mongoose](https://mongoosejs.com/) for providing an elegant MongoDB object modeling tool.
- Special thanks to AWS for their reliable cloud services.

---
