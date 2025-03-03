import axios from "axios";

const API_BASE_URL = "https://demo.vrtex.duckdns.org/api/shop";
export const CreateNewPasswordService = async (
  password,
  password_confirmation,
  email
) => {
  try {
    const response = await axios({
      url: `${API_BASE_URL}/reset-password`,
      method: "POST",
      data: {
        password,
        password_confirmation,
        email,
      },
    });
    if (response.status === 200) {
      console.log("Password reset successfully");
      return true;
    }
  } catch (error) {
    console.error("Failed to reset password: ", error);
    return false;
  }
};
