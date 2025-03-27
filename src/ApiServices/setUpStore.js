import axios from "axios";

const API_BASE_URL = "https://";
const live_shop_domain = localStorage.getItem("live_shop_domain");
const role = localStorage.getItem("role");
export const setUpStore = async (storeData) => {
  try {
    const response = await axios({
      method: "POST",
      url: `${API_BASE_URL}${live_shop_domain}/api/${role}/setup-store`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      data: storeData,
    });
    if (response.status === 200) {
      console.log("Store setup successful!");
    } else {
      console.error("Failed to setup store:", response.data.message);
    }
  } catch (error) {
    console.error("Failed to setup store:", error.message);
  }
};
