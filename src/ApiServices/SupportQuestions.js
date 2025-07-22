import axios from "axios";
const live_shop_domain = localStorage.getItem("live_shop_domain");
const role = localStorage.getItem("role");
export const getSupportQusetions = async () => {
  try {
    const response = await axios({
      url: `https://${live_shop_domain}/api/${role}/support-questions`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Accept-Language": "en",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (response.status === 200) {
      if (Array.isArray(response.data)) {
        return response.data;
      } else if (response.data && Array.isArray(response.data.data)) {
        return response.data.data;
      }
      return [];
    }
    return [];
  } catch (error) {
    console.error(
      "Failed to fetch questions:",
      error.response?.data || error.message
    );
    return [];
  }
};