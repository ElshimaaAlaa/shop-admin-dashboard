import axios from "axios";
export const GetPersonalInfo = async () => {
  try {
    const response = await axios({
      url: "https://demo.vrtex.duckdns.org/api/profile",
      method: "GET",
      headers: {
        Authorization: `Bearer 1K9elSZiyQKW2wIs5uWHOR1hfLVPBavnhHRCUnbF079f2990`,
      },
    });
    if (response.status === 200) {
      console.log(response.data.data);
      return response.data.data;
    } else {
      console.error("Failed to fetch data");
    }
  } catch (error) {
    console.error("Failed to fetch data", error);
  }
};
