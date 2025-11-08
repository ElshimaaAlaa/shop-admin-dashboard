import axios from "axios";
const live_shop_domain = localStorage.getItem("live_shop_domain");
const role = localStorage.getItem("role");
export const fetchCategories = async () => {
  try {
    const response = await axios.get(`https://${live_shop_domain}/api/${role}/categories`, {
      headers: {
        "Accept-Language": "en",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (response.status === 200) {
      return response.data.data;
    }
  } catch (error) {
    console.error("Failed to fetch data: ", error);
    throw error;
  }
};