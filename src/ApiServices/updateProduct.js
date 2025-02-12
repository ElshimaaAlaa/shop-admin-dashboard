import axios from "axios";

const API_BASE_URL = "https://demo.vrtex.duckdns.org/api/shop/products";

export const updateProduct = async (productId, formData) => {
  try {
    const response = await axios({
      url: `${API_BASE_URL}/update/${productId}`,
      method: "POST",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer 1K9elSZiyQKW2wIs5uWHOR1hfLVPBavnhHRCUnbF079f2990`,
      },
    });
    if (response.status === 200) {
      console.log("Product updated successfully");
      return response.data;
    }
  } catch (error) {
    console.error("Failed to update product", error);
    throw error;
  }
};
