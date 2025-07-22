import axios from "axios";
const live_shop_domain = localStorage.getItem("live_shop_domain");
const role = localStorage.getItem("role");
export const AddShipping = async (providerData) => {
  try {
    const response = await axios({
      url: `https://${live_shop_domain}/api/${role}/shipping-providers/store`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Accept-Language": "en",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      data: providerData,
    });
    return response.data;
  } catch (error) {
    console.error(
      "Failed to add shipping",
      error.response?.data || error.message
    );
    throw error;
  }
};
