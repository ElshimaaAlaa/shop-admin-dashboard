import axios from "axios";
const live_shop_domain = localStorage.getItem("live_shop_domain");
const role = localStorage.getItem("role");
export const handleUpdatePassword = async (password, password_confirmation) => {
  try {
    const response = await axios({
      url: `https://${live_shop_domain}/api/${role}/update-password`,
      method: "POST",
      headers: {
        "Accept-Language": "en",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      data: {
        password,
        password_confirmation,
      },
    });
    if (response.status === 200) {
      console.log("Password updated successfully");
      return response.data;
    } else {
      console.error("Failed to update password");
    }
  } catch (error) {
    console.error("Failed to update password", error);
    throw error;
  }
};
