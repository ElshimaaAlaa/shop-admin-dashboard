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
        Authorization: `Bearer ddBBMCtMD7nH4eD0IHGgBVAKEPWs6ROKzxJi3woYbee1a631`,
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
