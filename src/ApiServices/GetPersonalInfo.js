import axios from "axios";
const API_BASE_URL = "https://";
const live_shop_domain = localStorage.getItem("live_shop_domain");
const role = localStorage.getItem("role");
export const GetPersonalInfo = async () => {
  try {
    const response = await axios({
      url: `${API_BASE_URL}${live_shop_domain}/api/${role}/profile`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (response.status === 200) {
      console.log(response.data.data);
      localStorage.setItem("User Name", response.data.data.name);
      localStorage.setItem("User email", response.data.data.email);
      localStorage.setItem("User Phone", response.data.data.phone);
      localStorage.setItem("User image", response.data.data.image);
      return response.data.data;
    } else {
      console.error("Failed to fetch data");
    }
  } catch (error) {
    console.error("Failed to fetch data", error);
  }
};