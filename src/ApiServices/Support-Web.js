import axios from "axios";
const live_shop_domain = "https://demo.vrtex.duckdns.org/api/";
export const sendSupport = async (email, name, phone, message) => {
  try {
    const response = await axios({
      method: "POST",
      url: `${live_shop_domain}send-contact`,
      data: { email, name, phone, message },
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Accept-Language": "ar",
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
