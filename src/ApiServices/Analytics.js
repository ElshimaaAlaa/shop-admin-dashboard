import axios from "axios";
const live_shop_domain = localStorage.getItem("live_shop_domain");
const role = localStorage.getItem("role");

export const fetchAnalyticsData = async (language = "ar") => {
  try {
    const response = await axios({
      url: `https://${live_shop_domain}/api/${role}/analytics?year=2026`,
      method: "GET",
      headers: {
        "Accept-Language": language, 
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (response.status === 200) {
      return response.data.data;
    }
    throw new Error("Failed to fetch analytics data");
  } catch (error) {
    console.error("Failed to fetch data", error);
    throw error;
  }
};