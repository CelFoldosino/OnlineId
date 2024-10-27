/** @format */

import axios from "axios";

const globalUrl = process.env.REACT_APP_GLOBAL_URL;
const authToken = process.env.REACT_APP_X_AUTH_TOKEN;

const headers = {
  "Content-Type": "application/json",
  "x-auth-token": authToken,
};

export const getIssuedId = async () => {
  try {
    const response = await axios.get(`${globalUrl}/philsca/retrieve-issuedId`, {
      headers,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching Issued ID:", error);
    throw error;
  }
};

export const issuedId = async ({ body }) => {
  try {
    const response = await axios.patch(
      `${globalUrl}/philsca/issued-id`,
      JSON.stringify(body),
      {
        headers,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error Issued ID:", error);
    throw error;
  }
};
