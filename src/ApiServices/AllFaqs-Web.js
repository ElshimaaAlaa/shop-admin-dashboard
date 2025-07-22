import axios from "axios";
const live_shop_domain = "https://demo.vrtex.duckdns.org/api/";
export const getFaqs = async () => {
  try {
    const response = await axios({
      url: `${live_shop_domain}faqs`,
      method: "GET",
      headers: {
        "Accept-Language": "en",
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