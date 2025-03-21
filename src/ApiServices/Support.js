import axios from "axios";
const API_BASE_URL = "https://";
const live_shop_domain = localStorage.getItem("live_shop_domain");
const role = localStorage.getItem("role");
export const sendSupport = async (email, name, phone, message) => {
  try {
    const response = await axios({
      method: "POST",
      url: `${API_BASE_URL}${live_shop_domain}/api/${role}/send-contact`,
      data: { email, name, phone, message },
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Accept-Language": "ar",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (response.status === 200) {
      console.log("Support sent successfully");
      return response.data;
    }
  } catch (error) {
    console.error("Failed to send support", error);
    throw error;
  }
};
