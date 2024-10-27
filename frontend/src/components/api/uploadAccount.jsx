/** @format */

import axios from "axios";

const globalUrl = process.env.REACT_APP_GLOBAL_URL;
const authToken = process.env.REACT_APP_X_AUTH_TOKEN;

export const uploadAccount = async (file) => {
  const formData = new FormData(); // Create a FormData object
  formData.append("file", file); // Append the file to the form data

  try {
    const response = await axios.post(
      `${globalUrl}/philsca/upload`, // The endpoint for your upload
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data", // Set the content type to multipart/form-data
        },
      }
    );
    return response.data; // Return the response data from the server
  } catch (error) {
    console.error("Error uploading account:", error);
    throw error; // Rethrow the error for further handling
  }
};
