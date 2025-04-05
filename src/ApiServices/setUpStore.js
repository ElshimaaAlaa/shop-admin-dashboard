import axios from "axios";

export const setUpStore = async (formData) => {
  try {
    const response = await axios({
      method: "POST",
      url: "https://demo.vrtex.duckdns.org/api/shop/setup-store",
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