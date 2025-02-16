import axios from "axios";

const API_BASE_URL = "https://demo.vrtex.duckdns.org/api";
export const updateProfile = async (formData) => {
  try {
    const response = await axios({
      url: `${API_BASE_URL}/update-profile`,
      method: "POST",
      headers: {
        "Accept-Language": "en",
        Authorization:
          "Bearer 1K9elSZiyQKW2wIs5uWHOR1hfLVPBavnhHRCUnbF079f2990",
      },
      data: {
        formData,
      },
    });
    if (response.status === 200) {
      console.log("Profile updated successfully");
      return response.data;
    }
  } catch (error) {
    console.error("Failed to update profile: ", error);
    throw error;
  }
};
