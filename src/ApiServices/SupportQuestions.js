import axios from "axios";
const API_BASE_URL = "https://";
const live_shop_domain = localStorage.getItem("live_shop_domain");
const role = localStorage.getItem("role");
export const getSupportQusetions = async () => {
  try {
    const response = await axios({
      url: `${API_BASE_URL}${live_shop_domain}/api/${role}/support-questions`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (response.status === 200) {
      const data = response.data?.data || response.data || [];
      console.log("Successfully fetched questions:", data);
      return Array.isArray(data) ? data : [];
    }
    return [];
  } catch (error) {
    console.error(
      "Failed to get support questions",
      error.response?.data || error.message
    );
    return [];
  }
};
