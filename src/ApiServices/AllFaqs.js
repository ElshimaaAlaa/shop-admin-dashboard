import axios from "axios";
const API_BASE_URL = "https://demo.vrtex.duckdns.org/api/shop";
export const getFaqs = async () => {
  try {
    const response = await axios({
      url: `${API_BASE_URL}/faqs`,
      method: "GET",
      headers: {
        "Accept-Language": "en",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (response.status === 200) {
      return response.data.data;
    }
  } catch (error) {
    console.error("Failed to fetch faqs: ", error);
    throw error;
  }
};
