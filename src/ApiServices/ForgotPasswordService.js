import axios from "axios";
const API_BASE_URL = "https://";
const live_shop_domain = localStorage.getItem("live_shop_domain");
const role = localStorage.getItem("role");

export const ForgotPasswordService = async (email) => {
  try {
    const response = await axios({
      method: "POST",
      url: `${API_BASE_URL}${live_shop_domain}/api/${role}/send-otp`,
      data: { email },
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      localStorage.setItem("Email Admin", email);
      return response.data;
    }
  } catch (error) {
    if (error.response && error.response.status === 404) {
      throw new Error("Email not found. Please check your email address.");
    } else {
      throw new Error("Failed to send OTP. Please try again.");
    }
  }
};
