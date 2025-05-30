import axios from "axios";
const API_BASE_URL = "https://";
export const getGeneralSettings = async () => {
  try {
    const response = await axios({
      url: `${API_BASE_URL}demo.vrtex.duckdns.org/api/settings`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Accept-Language": "ar",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (response.status === 200) {
      console.log("get general settings of vertex success");
      return response.data.data;
    }
  } catch (error) {
    console.error("Failed to get general settings of vertex", error);
    throw error;
  }
};
