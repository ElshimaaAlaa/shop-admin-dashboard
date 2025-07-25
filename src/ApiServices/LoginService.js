import axios from "axios";
const live_shop_domain = localStorage.getItem("live_shop_domain");
const role = localStorage.getItem("role");
export const loginService = async (email, password) => {
  try {
    const response = await axios({
      url: `https://${live_shop_domain}/api/${role}/login`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Accept-Language": "ar",
      },
      data: {
        email,
        password,
      },
    });
    if (response.status === 200) {
      localStorage.setItem("token", response.data.data.token);
      localStorage.setItem("admin name", response.data.data.name);
      console.log(response.data.data);
      return response.data.data;
    }
  } catch (error) {
    throw new Error("Failed to login");
  }
};
