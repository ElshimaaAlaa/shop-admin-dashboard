import axios from "axios";
const API_BASE_URL = "https://demo.vrtex.duckdns.org/api/shop";
export const fetchProducts = async () => {
  try {
    const response = await axios({
      url: `${API_BASE_URL}/products`,
      method: "GET",
      headers: {
        "Accept-Language": "en",
        Authorization:
          "Bearer ddBBMCtMD7nH4eD0IHGgBVAKEPWs6ROKzxJi3woYbee1a631",
      },
    });
    if (response.status === 200) {
      console.log(response.data.data);
      return response.data.data;
    }
  } catch (error) {
    console.error("Failed to fetch data", error);
    throw error;
  }
};