import React, { useEffect, useState } from "react";
import Loader from "./Loader";
import axios from "axios";

const AllImages = () => {
  // State variables to manage file upload and image data
  const [Uploading, setUploading] = useState(false); // Indicates if an image is currently being uploaded
  const [selectedFile, setSelectedFile] = useState(""); // Stores the selected file for upload
  const [allPosts, setAllPosts] = useState([]); // Stores all the uploaded image data

  // Function to handle file selection
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]); // Access the files array and select the first file
  };

  // Create FormData object to append the selected file for upload
  const formData = new FormData();
  formData.append("image", selectedFile);

  // Function to handle image upload
  async function handleUploadImage(e) {
    e.preventDefault();
    setUploading(true); // Set uploading state to true during image upload
    try {
      let headers = {
        "Content-Type": "multipart-form-data",
      };
      // Send a POST request to upload the image
      let response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/image/uploadImage`,
        formData,
        { headers }
      );
    } catch (error) {
      console.log(error.message); // Log any errors that occur during image upload
    } finally {
      setUploading(false); // Set uploading state to false after image upload completes
      setSelectedFile(""); // Clear the selected file after upload completes
    }
  }

  // Fetch all images from the backend when selectedFile changes or on component mount
  useEffect(() => {
    let getAllPosts = async () => {
      try {
        // Send a GET request to retrieve all images from the backend
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/image/getAllImages`
        );
        // Set the retrieved image data to the state variable
        setAllPosts(response.data.posts);
      } catch (error) {
        console.log(error.message); // Log any errors that occur during image retrieval
      }
    };
    getAllPosts();
  }, [selectedFile]); // Trigger the effect whenever selectedFile changes

  return (
    <>
      <div className="flex justify-between mt-8 px-4 font-sans">
        <h1 className="font-mono">Awesome Image uploader</h1>
        {/* Display file upload form and uploaded images */}
        {!Uploading && (
          <div className="text-center">
            {/* Form for uploading images */}
            <form onSubmit={handleUploadImage}>
              <label htmlFor="imageUpload">
                <div className="bg-gray-200 mx-[6rem] h-[200px] flex justify-center items-center rounded-lg">
                  {selectedFile ? (
                    <p>{selectedFile.name}</p> // Display filename if a file is selected
                  ) : (
                    <p>Select Image</p>
                  )}
                  <input
                    type="file"
                    name="imageUpload"
                    id="imageUpload"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </div>
              </label>
              {/* Display upload button if a file is selected */}
              {selectedFile && (
                <button
                  type="submit"
                  className="bg-gray-100 px-4 py-3 rounded-md mt-3 ">
                  Upload Image
                </button>
              )}
            </form>
            {/* Display uploaded images */}
            <div className="flex mt-8 flex-wrap gap-4 mx-24 min-h-screen ">
              {!Uploading &&
                allPosts.map(({ _id, imageUrl }) => (
                  <div className="w-[18.5rem]  " key={_id}>
                    <img src={imageUrl} alt="image" className="rounded-md" />
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Display loader when uploading */}
        {Uploading && <Loader />}
      </div>
    </>
  );
};

export default AllImages;
