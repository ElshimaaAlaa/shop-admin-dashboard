import axios from "axios";
const API_BASE_URL = "https://demo.vrtex.duckdns.org/api/shop";
export const fetchCategories = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/categories`, {
      headers: {
        "Accept-Language": "en",
        Authorization:
          "Bearer ddBBMCtMD7nH4eD0IHGgBVAKEPWs6ROKzxJi3woYbee1a631",
      },
    });
    if (response.status === 200) {
      console.log(response.data)
      return response.data.data;
    }
  } catch (error) {
    console.error("Failed to fetch data: ", error);
    throw error;
  }
};