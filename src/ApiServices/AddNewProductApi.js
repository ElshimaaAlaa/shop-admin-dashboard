import axios from "axios";

const API_BASE_URL = "https://demo.vrtex.duckdns.org/api/shop";

export const addProduct = async (formData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/products/store`, formData, {
      headers: {
        Authorization: `Bearer 1K9elSZiyQKW2wIs5uWHOR1hfLVPBavnhHRCUnbF079f2990`,
        "Content-Type": "multipart/form-data",
      },
    });
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error("Failed to add product", error);
    throw error; // Re-throw the error for handling in the component
  }
};