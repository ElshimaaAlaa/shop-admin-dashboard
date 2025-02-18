import axios from "axios";
export const handleUpdatePassword = async (password, password_confirmation) => {
  try {
    const response = await axios({
      url: "https://demo.vrtex.duckdns.org/api/shop/update-password",
      method: "POST",
      headers: {
        Authorization: `Bearer 1K9elSZiyQKW2wIs5uWHOR1hfLVPBavnhHRCUnbF079f2990`,
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
