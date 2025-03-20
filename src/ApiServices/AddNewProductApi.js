import axios from "axios";

const API_BASE_URL = "https://demo.vrtex.duckdns.org/api/shop";
export const addProduct = async (formData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/products/store`, formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "multipart/form-data",
        // "Accept-Language": "en",

      },
    });
    if (response.status === 200) {
      console.log("Product added successfully");
      console.log(response.data)
      return response.data;
    }
  } catch (error) {
    console.error("Failed to add product", error);
    throw error;
  }
};