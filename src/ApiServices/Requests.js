import axios from "axios";
const API_BASE_URL = "https://";
const live_shop_domain = localStorage.getItem("live_shop_domain");
const role = localStorage.getItem("role");
export const getRequests = async () => {
  try {
    const response = await axios({
      url: `${API_BASE_URL}/${live_shop_domain}/api/${role}/support-questions?requests=1`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (response.status === 200) {
      if (Array.isArray(response.data)) {
        return response.data;
      } else if (response.data && Array.isArray(response.data.data)) {
        return response.data;
      }
      return [];
    }
    return [];
  } catch (error) {
    console.error(
      "Failed to fetch Requests:",
      error.response?.data || error.message
    );
    return [];
  }
};
