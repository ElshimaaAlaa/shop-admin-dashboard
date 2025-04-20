import axios from "axios";
const API_BASE_URL = "https://";
const live_shop_domain = localStorage.getItem("live_shop_domain");
const role = localStorage.getItem("role");
export const AddPayment = async (paymentData) => {
  try {
    const response = await axios({
      url: `${API_BASE_URL}${live_shop_domain}/api/${role}/payment-methods/store`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
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