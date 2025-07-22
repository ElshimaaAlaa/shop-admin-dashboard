import axios from "axios";
const live_shop_domain = localStorage.getItem("live_shop_domain");
const role = localStorage.getItem("role");
export const AddPayment = async (paymentData) => {
  try {
    const response = await axios({
      url: `https://${live_shop_domain}/api/${role}/payment-methods/store`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Accept-Language": "en",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      data: paymentData,
    });
    return response.data;
  } catch (error) {
    console.error(
      "Failed to add payment",
      error.response?.data || error.message
    );
    throw error;
  }
};
