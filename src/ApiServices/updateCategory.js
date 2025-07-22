import axios from "axios";
const live_shop_domain = localStorage.getItem("live_shop_domain");
const role = localStorage.getItem("role");
export const updateCategory = async (formData, categoryId) => {
  try {
    const response = await axios({
      method: "POST",
      url: `https://${live_shop_domain}/api/${role}/categories/update/${categoryId}`,
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
