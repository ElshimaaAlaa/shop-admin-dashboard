import axios from "axios";
const live_shop_domain = localStorage.getItem("live_shop_domain");
const role = localStorage.getItem("role");

export const receivedOrders = async () => {
  try {
    const response = await axios({
      url: `https://${live_shop_domain}/api/${role}/received-orders`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Accept-Language": "en",
      },
    });
    if (response.status === 200) {
      return response.data.data;
    } else {
      throw new Error("Failed to fetch received orders");
    }
  } catch (error) {
    console.error("Failed to fetch received orders: ", error);
    throw error;
  }
};
