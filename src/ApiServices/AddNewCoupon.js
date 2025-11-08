import axios from "axios";
const live_shop_domain = localStorage.getItem("live_shop_domain");
const role = localStorage.getItem("role");
export const addCoupon = async (formData) => {
  try {
    const response = await axios.post(
      `https://${live_shop_domain}/api/${role}/coupons/store`,
      formData,
      {
        headers: {
          "Accept-Language": "en",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (response.status === 200) {
      console.log("coupon added successfully");
      return response.data;
    }
  } catch (error) {
    console.error("Failed to add coupon", error);
    throw error;
  }
};
