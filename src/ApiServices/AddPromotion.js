import axios from "axios";
const API_BASE_URL = "https://";
const live_shop_domain = localStorage.getItem("live_shop_domain");
const role = localStorage.getItem("role");
export const AddPromotionService = async (formData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}${live_shop_domain}/api/${role}/promotions/store`,
      formData,
      {
        headers: {
          "Accept-Language": "en",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    if (response.status === 200) {
      console.log("promotions added successfully");
      console.log(response.data);
      return response.data;
    }
  } catch (error) {
    console.error("Failed to add promotions", error);
    throw error;
  }
};
