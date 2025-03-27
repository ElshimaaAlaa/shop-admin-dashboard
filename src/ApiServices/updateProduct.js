import axios from "axios";
const API_BASE_URL = "https://";
const live_shop_domain = localStorage.getItem("live_shop_domain");
const role = localStorage.getItem("role");
export const updateProduct = async (productId, formData) => {
  try {
    const response = await axios({
      url: `${API_BASE_URL}${live_shop_domain}/api/${role}/update/products${productId}`,
      method: "POST",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Accept-Language": "en",
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