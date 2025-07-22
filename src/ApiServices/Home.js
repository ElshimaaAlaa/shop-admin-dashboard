import axios from "axios";
const live_shop_domain = localStorage.getItem("live_shop_domain");
const role = localStorage.getItem("role");
export const getHome = async (language = "ar") => {
  try {
    const response = await axios({
      url: `https:///${live_shop_domain}/api/${role}/dashboard`,
      method: "GET",
      headers: {
        "Accept-Language": language,
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (response.status === 200) {
      return response.data.data;
    }
  } catch (error) {
    console.error("Failed to fetch home data: ", error);
    throw error;
  }
};
