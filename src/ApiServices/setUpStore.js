import axios from "axios";

const API_BASE_URL = "https://your-api-base-url.com/";
const live_shop_domain = localStorage.getItem("live_shop_domain");
const role = localStorage.getItem("role");

export const setUpStore = async (storeData) => {
  try {
    const response = await axios({
      method: "POST",
      url: `${API_BASE_URL}${live_shop_domain}/api/${role}/setup-store`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        'Content-Type': 'multipart/form-data'
      },
      data: storeData,
    });
    
    if (response.status === 200) {
      return response.data;
    }
    throw new Error(response.data.message || "Failed to setup store");
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message || "Failed to setup store");
  }
};