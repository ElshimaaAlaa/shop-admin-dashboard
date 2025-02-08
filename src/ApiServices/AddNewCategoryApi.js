import axios from "axios";

const API_BASE_URL = "https://demo.vrtex.duckdns.org/api/shop";
const AUTH_TOKEN =
  "Bearer 1K9elSZiyQKW2wIs5uWHOR1hfLVPBavnhHRCUnbF079f2990";

export const addCategory = async (formData) => {
  try {
    const response = await axios({
      url: `${API_BASE_URL}/categories/store`,
      method: "POST",
      headers: {
        Authorization: AUTH_TOKEN,
        "Content-Type": "multipart/form-data",
      },
      data: formData,
    });

    if (response.status === 200) {
      return response.data; 
    }
  } catch (error) {
    console.error("Failed to add category", error);
    throw error;
  }
};