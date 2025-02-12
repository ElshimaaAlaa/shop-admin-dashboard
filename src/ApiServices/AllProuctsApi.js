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
          "Bearer 1K9elSZiyQKW2wIs5uWHOR1hfLVPBavnhHRCUnbF079f2990",
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