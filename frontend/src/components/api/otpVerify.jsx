/** @format */

import axios from "axios";

const globalUrl = process.env.REACT_APP_GLOBAL_URL;
const authToken = process.env.REACT_APP_X_AUTH_TOKEN;

const headers = {
  "Content-Type": "application/json",
  "x-auth-token": authToken,
};

export const verifyOtp = async ({ body }) => {
  try {
    const response = await axios.post(
      `${globalUrl}/philsca/verify-otp`,
      JSON.stringify(body),
      { headers, withCredentials: true }
    );
    return response.data; // Assuming you want to return the newly created account data
  } catch (error) {
    console.error("Error creating account:", error);
    throw error;
  }
};
