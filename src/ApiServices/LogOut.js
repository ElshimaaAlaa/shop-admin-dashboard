import axios from "axios";
const API_BASE_URL = "https://";
const live_shop_domain = localStorage.getItem("live_shop_domain");
const role = localStorage.getItem("role");
export const logOut = async () => {
  try {
    const response = await axios({
      url: `${API_BASE_URL}${live_shop_domain}/api/${role}/logout`,
      method: "POST",
    });
    if (response.status === 200) {
      console.log("Logged out successfully");
      localStorage.removeItem("token");
      return true;
    } else {
      console.error("Failed to log out");
    }
  } catch (error) {
    console.error("Failed to log out", error);
  }
};
