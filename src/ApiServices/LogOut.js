import axios from "axios";
const live_shop_domain = localStorage.getItem("live_shop_domain");
const role = localStorage.getItem("role");
export const logOut = async () => {
  try {
    const response = await axios({
      url: `https://${live_shop_domain}/api/${role}/logout`,
      method: "POST",
          headers: {
        Accept: "application/json",
        "Accept-Language": "ar",
      },
    });
    if (response.status === 200) {
      console.log("Logged out successfully");
      sessionStorage.removeItem("token");
      return true;
    } else {
      console.error("Failed to log out");
    }
  } catch (error) {
    console.error("Failed to log out", error);
  }
};