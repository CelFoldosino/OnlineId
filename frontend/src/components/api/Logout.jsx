/** @format */

import axios from "axios";

const globalUrl = process.env.REACT_APP_GLOBAL_URL;

const headers = {
  "Content-Type": "application/json",
};

export const logout = async () => {
  try {
    const response = await axios.post(
      `${globalUrl}/philsca/logout`,
      {},
      { headers, withCredentials: true }
    );
    return response.data; 
  } catch (error) {
    console.error("Error logout account:", error);
    throw error;
  }
};
