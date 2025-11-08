import axios from "axios";

const live_shop_domain = localStorage.getItem("live_shop_domain");
const role = localStorage.getItem("role");
export const notificationService = async ({language}) => {
  try {
    const response = await axios({
      url: `https://${live_shop_domain}/api/${role}/notifications`,
      method: "GET",
      headers: {
        Accept: "application/json",
        "Accept-Language": language,
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (response.status === 200) {
      return response.data.data;
    }
    throw new Error("Failed to get notifications");
  } catch (error) {
    console.error("Notification service error:", error);
    throw error;
  }
};
