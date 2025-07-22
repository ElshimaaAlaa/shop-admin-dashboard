import axios from "axios";
const live_shop_domain = localStorage.getItem("live_shop_domain");
const role = localStorage.getItem("role");

export const ForgotPasswordService = async (email) => {
  try {
    const response = await axios({
      method: "POST",
      url: `https://${live_shop_domain}/api/${role}/send-otp`,
      data: { email },
      headers: {
        "Content-Type": "application/json",
        "Accept-Language": "ar",
      },
    });

    if (response.status === 200) {
      localStorage.setItem("shop admin email", email);
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
