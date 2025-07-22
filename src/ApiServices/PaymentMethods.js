import axios from "axios";
const live_shop_domain = localStorage.getItem("live_shop_domain");
const role = localStorage.getItem("role");
export const fetchPaymentMethods = async () => {
  try {
    const response = await axios({
      url: `https://${live_shop_domain}/api/${role}/payment-methods`,
      method: "GET",
      headers: {
        "Accept-Language": "en",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (response.status === 200) {
      console.log("success fetch payment-methods");
      return response.data;
    }
  } catch (error) {
    console.error("Failed to fetch payment-methods", error);
    throw error;
  }
};
