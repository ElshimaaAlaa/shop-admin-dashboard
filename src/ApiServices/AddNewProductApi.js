import axios from "axios";

const API_BASE_URL = "https://demo.vrtex.duckdns.org/api/shop";

export const addProduct = async (formData) => {
  try {
    const response = await axios({
      url: `${API_BASE_URL}/products/store`,
      method: "POST",
      headers: {
        Authorization: `Bearer 1K9elSZiyQKW2wIs5uWHOR1hfLVPBavnhHRCUnbF079f2990`,
        "Content-Type": "multipart/form-data",
      },
      data: formData,
    });
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error("Failed to add product", error);
    return null;
  }
};