import axios from "axios";
const API_BASE_URL = "https://demo.vrtex.duckdns.org/api/shop/categories";
export const updateCategory = async (formData, categoryId) => {
  try {
    const response = await axios({
      method: "POST",
      url: `${API_BASE_URL}/update/${categoryId}`,
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Accept-Language": "en",
      },
    });
    if (response.status === 200) {
      console.log("Category updated successfully");
      return response.data;
    } else {
      throw new Error("Failed to update category: Server error");
    }
  } catch (error) {
    console.error("Failed to update category:", error);
    throw error;
  }
};
