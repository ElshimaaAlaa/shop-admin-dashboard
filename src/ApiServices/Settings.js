import axios from "axios";
const API_BASE_URL = "https://";
const live_shop_domain = localStorage.getItem("live_shop_domain");
const role = localStorage.getItem("role");
export const settings = async () => {
  try {
    const response = await axios({
      url: `${API_BASE_URL}${live_shop_domain}/api/${role}/settings`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Accept-Language": "ar",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (response.status === 200) {
      console.log("get general settings success");
      return response.data.data;
    }
  } catch (error) {
    console.error("Failed to add FAQ", error);
    throw error;
  }
};
