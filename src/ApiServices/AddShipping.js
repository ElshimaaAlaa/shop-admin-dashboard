import axios from "axios";
const API_BASE_URL = "https://";
const live_shop_domain = localStorage.getItem("live_shop_domain");
const role = localStorage.getItem("role");
export const AddShippingj = async (name) => {
  try {
    const response = await axios({
      url: `${API_BASE_URL}${live_shop_domain}/api/${role}/shipping-providers/store`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Accept-Language": "ar",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      data: { name },
    });
    if (response.status === 200) {
      console.log("shipping added successfully");
    }
  } catch (error) {
    console.error("Failed to add shipping", error);
    throw error;
  }
};
