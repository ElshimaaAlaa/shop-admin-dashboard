import axios from "axios";
export const logOut = async () => {
  try {
    const response = await axios({
      url: "https://demo.vrtex.duckdns.org/api/shop/logout",
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
