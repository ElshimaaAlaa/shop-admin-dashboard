import axios from "axios";
const live_shop_domain = localStorage.getItem("live_shop_domain");
const role = localStorage.getItem("role");
export const setUpStore = async (formData) => {
  try {
    const response = await axios({
      method: "POST",
      url: `https://${live_shop_domain}/api/${role}/setup-store`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        'Content-Type': 'multipart/form-data'
      },
      data: formData,
    });
    
    if (response.status === 200) {
      return response.data;
    }
    throw new Error(response.data.message || "Failed to setup store");
  } catch (error) {
    console.error("API Error:", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      request: {
        data: error.config?.data,
        headers: error.config?.headers
      }
    });
    throw error;
  }
};